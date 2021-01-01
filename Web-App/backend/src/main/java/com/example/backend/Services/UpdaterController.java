package com.example.backend.Services;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Services.Helpers.EmailService;
import com.example.backend.Responses.WeatherApiResponses.ApiForecastResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Service
public class UpdaterController{

    @Value("${OPEN_WEATHER_API_KEY}")
    private String apiKey;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private EmailService emailService;

    @Async
    public CompletableFuture<ResponseEntity<?>> createThread(String cityName, String cityState, List<UsersDocument> usersList) throws Exception {
        long start = System.currentTimeMillis();
        System.out.println("In sendUpdate for : " + Thread.currentThread().getName());
        sendApiRequest(cityName, cityState, usersList);
        long end = System.currentTimeMillis();
        System.out.println("Total time: " + (end-start));
        return CompletableFuture.completedFuture(ResponseEntity.ok("success"));
    }

    public void sendApiRequest(String cityName, String cityState, List<UsersDocument> usersList){
        System.out.println("finding changes in weather for: " + cityName + "," + cityState + " for " + usersList.size() + " users");
        RestTemplate restTemplate = new RestTemplate();
        String uri = "http://api.openweathermap.org/data/2.5/forecast?";

        if (cityName != null && cityState != null){
            uri += "q=" + cityName + "," + cityState + ",us&units=imperial&appid=" + apiKey;
        }
        System.out.println("uri at: " + uri);
        ResponseEntity<ApiForecastResponse> apiForecastResponse = restTemplate.exchange(
            uri, HttpMethod.GET, null,
            new ParameterizedTypeReference<ApiForecastResponse>(){});

        ApiForecastResponse result = apiForecastResponse.getBody();
        Map<String, Map<String, Set<String>>> conditions = findConditions(result);
        sendEmails(conditions, usersList);
    }

    public Map<String, Map<String, Set<String>>> findConditions(ApiForecastResponse result){
        //<Rain, <light rain, <1-3-2020, 1-5-2020>>>
        Map<String, Map<String, Set<String>>> conditions = new HashMap<>();
        Map<String, Set<String>> detailsMap = new HashMap<>();
        result.getList().stream().forEach(item ->{
            item.getWeather().stream().forEach(weather->{
                if (!conditions.containsKey(weather.getMain())){
                    Set<String> dates = new HashSet<>();
                    dates.add(item.getDt_txt().substring(0,10));
                    Map<String, Set<String>> details = new HashMap<>();
                    details.put(weather.getDescription(), dates);

                    detailsMap.put(weather.getDescription(), dates);
                    conditions.put(weather.getMain(), details);
                } else {
                    if (!detailsMap.containsKey(weather.getDescription())){
                        Set<String> dates = new HashSet<>();
                        dates.add(item.getDt_txt().substring(0,10));
                        detailsMap.put(weather.getDescription(), dates);
                        conditions.get(weather.getMain()).put(weather.getDescription(), dates);
                    } else {
                        conditions.get(weather.getMain()).get(weather.getDescription()).add(item.getDt_txt().substring(0,10));
                        detailsMap.get(weather.getDescription()).add(item.getDt_txt().substring(0,10));
                    }
                }
            });
        });
        System.out.println("conditions map: " + conditions.entrySet());
        return conditions;
    }

    public void sendEmails(Map<String, Map<String, Set<String>>> conditions, List<UsersDocument> usersList){

        usersList.stream().forEach(user-> {
            Map<String, Map<String, Set<String>>> userConditionMap = new HashMap<>(); 
            Arrays.asList(user.getNotificationConditions().split(",")).stream().forEach(condition -> {
                if (conditions.containsKey(condition)){
                    System.out.println("condition match for: " + condition);
                    userConditionMap.put(condition, conditions.get(condition));
                }
            });
            System.out.println("users map: " + userConditionMap.entrySet());
            try{
               emailService.sendUpdateEmail(user.getEmail(), user.getNotificationCity(), user.getNotificationState(), user.getNotificationConditions(), userConditionMap.entrySet().toString());
            } catch (Exception e){
                System.out.println("failed to send email to " + user.getEmail());
            }
        });

    }

    @RequestMapping(value = "/weatherupdatesforallusers", method = RequestMethod.POST)
    public ResponseEntity<?> automatedUpdates(){

        /*
        1. find all users
        2. for each unique city, add to map (key: city,state value: list of users)
        3. for each key (city,state) in map, create new thread to get api data + send updates for each user depending on conditions
        */
        System.out.println("hit weather udpate for all users");
        //<city,state, List<user>
        Map<String, List<UsersDocument>> cityMap = new HashMap<>();
        usersRepo.findBySendNotifications("true")
            .stream().forEach(user -> {
                String location = user.getNotificationCity() + "," + user.getNotificationState();
                if (!cityMap.containsKey(location)){
                    cityMap.put(location, Arrays.asList(user));
                } else {
                    cityMap.get(location).add(user);
                }
            });
        for (String key : cityMap.keySet()){
           // createThread(key.split(",")[0], key.split(",")[1], cityMap.get(key));
           System.out.println(key);
           sendApiRequest(key.split(",")[0], key.split(",")[1], cityMap.get(key));
        }


    
        // List<UsersDocument> usersList = usersRepo.findAll();
        // try{
        //     int count = 0;
        //     for (UsersDocument user : usersList){
        //         //Ensure API calls dont exceed 60 per minute
        //         if (count >= 30){
        //             TimeUnit.SECONDS.sleep(70);
        //             count=0;
        //         }
        //         //For each user, call api each time, iterate through each in parallel and determine if one contains new conditions
        //         count++;
        //     }
        // } catch (InterruptedException e){
        //     System.out.println(e);
        //     Thread.currentThread().interrupt();
        // }
        return ResponseEntity.ok("Success");
    }
    
}
