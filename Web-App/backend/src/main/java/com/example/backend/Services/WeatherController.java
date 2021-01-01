package com.example.backend.Services;

import java.util.ArrayList;
import java.util.List;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsCitiesRepo;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Requests.FindCityRequest;
import com.example.backend.Requests.GetWeatherForCityRequest;
import com.example.backend.Requests.NotificationRequest;
import com.example.backend.Responses.FindCityResponse;
import com.example.backend.Responses.WeatherApiResponses.ListData;
import com.example.backend.Responses.WeatherApiResponses.ApiForecastResponse;
import com.example.backend.Responses.WeatherForecastResponses.DayResponse;
import com.example.backend.Responses.WeatherForecastResponses.WeatherResponse;
import com.example.backend.Services.Helpers.EmailService;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;
import com.example.backend.cache.CityDataCache;
import com.example.backend.Responses.WeatherForecastResponses.ForecastResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Service
public class WeatherController {

    @Value("${OPEN_WEATHER_API_KEY}")
    private String apiKey;

    @Autowired
    private UsCitiesRepo usCitiesRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private CityDataCache cityDataCache;

    @Autowired
    private EmailService emailService;

    //Find city entered in home.jsx
    @RequestMapping("/findCity")
    public ResponseEntity<?> FindCity(@RequestBody FindCityRequest city){
        String[] cityName = city.getCity().split(" ");
        String formatted = "";
        for(String part : cityName){
            formatted += part.substring(0, 1).toUpperCase() + part.substring(1).toLowerCase() + " ";
        }
        System.out.println("Searching for city: " + formatted.trim());
        List<FindCityResponse> citiesResponse = new ArrayList<>();
        usCitiesRepo.findByCityOrderByPopulationDesc(formatted.trim()).stream().forEach(usCityDocument -> {
            FindCityResponse cityResponse = new FindCityResponse();
            cityResponse.setCity(usCityDocument.getCity());
            cityResponse.setStateId(usCityDocument.getState_id());
            cityResponse.setStateName(usCityDocument.getState_name());
            cityResponse.setCountyName(usCityDocument.getCounty_name());
            cityResponse.setTimezone(usCityDocument.getTimezone().replace("_", " "));
            cityResponse.setLat(usCityDocument.getLat());
            cityResponse.setLng(usCityDocument.getLng());
            cityResponse.setPopulation(usCityDocument.getPopulation());
            cityResponse.setDensity(usCityDocument.getDensity());
            citiesResponse.add(cityResponse);
        });
        return ResponseEntity.ok(citiesResponse);
    }

    //Show Weather data for a specific city after searchResults page
    @RequestMapping("/getWeatherForCity")
    public ResponseEntity<?> GetWeatherForCity(@RequestBody GetWeatherForCityRequest cityWeatherRequest){
        //access api call
        System.out.println("hit weather search");
        if (!cityDataCache.containsSearchedCity(cityWeatherRequest.getCityName(), cityWeatherRequest.getCityState())){
            System.out.println("New API hit for searched city");
            RestTemplate restTemplate = new RestTemplate();
            String uri = "http://api.openweathermap.org/data/2.5/forecast?";
            if (cityWeatherRequest.getCityName() != null && cityWeatherRequest.getCityState() != null){
                uri += "q=" + cityWeatherRequest.getCityName() + "," + cityWeatherRequest.getCityState() + ",us&units=imperial&appid=" + apiKey;
            }
            System.out.println("uri at: " + uri);
            ResponseEntity<ApiForecastResponse> apiForecastResponse = restTemplate.exchange(
                uri, HttpMethod.GET, null,
                new ParameterizedTypeReference<ApiForecastResponse>(){});

            ApiForecastResponse result = apiForecastResponse.getBody();
            WeatherResponse weatherResponse = new WeatherResponse();
            weatherResponse.setCityName(cityWeatherRequest.getCityName());
            weatherResponse.setCityState(cityWeatherRequest.getCityState());
            ResponseEntity<?> searchedCityData = ResponseEntity.ok(formatWeatherResponse(weatherResponse, result));
            cityDataCache.updateSearchedCityCache(cityWeatherRequest.getCityName(), cityWeatherRequest.getCityState(), searchedCityData);
            return searchedCityData;
        } else {
            System.out.println("hit cache for searched city");
            return cityDataCache.getSearchedCityData(cityWeatherRequest.getCityName(), cityWeatherRequest.getCityState());
        } 
    }

    public WeatherResponse formatWeatherResponse(WeatherResponse weatherResponse, ApiForecastResponse result){
        weatherResponse.setId(result.getCity().getId());
        int startTime = result.getList().get(0).getDt();
        int endDayTime = startTime + (3600 * 3 * 8);
        float lowTemp = result.getList().get(0).getMain().getTemp_min();
        float highTemp = result.getList().get(0).getMain().getTemp_max();
        float totalTemp = 0;
        int intervalCounter = 0;
        boolean isToday = true;
        for (int i = 0; i< result.getList().size(); i++){
            ListData data = result.getList().get(i);
            if (data.getDt() <= endDayTime && isToday){
                DayResponse day = new DayResponse();
                day.setTemp(data.getMain().getTemp());
                day.setFeelsLike(data.getMain().getFeels_like());
                day.setHumidity(data.getMain().getHumidity());
                data.getWeather().stream().forEach(weather -> day.getDescriptions().add(weather.getDescription()));
                //day.setDescriptions(data.getWeather());
                day.setDateTime(data.getDt_txt());
                weatherResponse.getDayResponse().add(day);
            }

            totalTemp += data.getMain().getTemp();
            lowTemp = checkMin(lowTemp, data.getMain().getTemp_min());
            highTemp = checkMax(highTemp, data.getMain().getTemp_max());
           // System.out.println("i: " + i + " time: " + data.getDt_txt() + " txt: " + (data.getDt()-startTime) + " total: " + totalTemp + " added: " + data.getMain().getTemp() + " high: " + highTemp + " lowTemp: " + lowTemp);
            if (data.getDt() != startTime && intervalCounter == 8){
                ForecastResponse forecastResponse = new ForecastResponse();
                forecastResponse.setMinTemp(lowTemp);
                forecastResponse.setMaxTemp(highTemp);
                float temp = totalTemp/9;
                forecastResponse.setAvgTemp((Math.round(temp*100.0))/100.0f);
                forecastResponse.setDate(data.getDt_txt().substring(0,10));
                data.getWeather().stream().forEach(weather-> forecastResponse.getDescriptions().add(weather.getDescription()));
                weatherResponse.getForecastResponse().add(forecastResponse);
                lowTemp = data.getMain().getTemp_min();
                highTemp = data.getMain().getTemp_max();
                totalTemp = data.getMain().getTemp();
                intervalCounter = 0;
                i--;
                isToday=false;
            } else{
                intervalCounter++;
            }
        }
        return weatherResponse;
    }

    public float checkMin(float min, float curr){
        if (curr < min){
            min = curr;
        }
        return min;
    }

    public float checkMax(float max, float curr){
        if (curr > max){
            max = curr;
        }
        return max;
    }

    @RequestMapping("/setDefaultCity")
    public ResponseEntity<?> SetDefaultCity(@RequestHeader("Authorization") String jwt, @RequestBody GetWeatherForCityRequest cityWeatherRequest){
        String username = jwtUtil.extractUsername(jwt.substring(7));
        UsersDocument currentInfo = usersRepo.findByUsername(username);
        currentInfo.setCity(cityWeatherRequest.getCityName());
        currentInfo.setState(cityWeatherRequest.getCityState());
        usersRepo.save(currentInfo);
        cityDataCache.setDefaultCity(cityDataCache.getSearchedCityData(cityWeatherRequest.getCityName(), cityWeatherRequest.getCityState()));
        return ResponseEntity.ok("Set as default");
    }

    @RequestMapping("/getEmail")
    public ResponseEntity<?> GetEmail(@RequestHeader("Authorization") String jwt){
        System.out.println("Get email for notifications");
        String username = jwtUtil.extractUsername(jwt.substring(7));
        String email = usersRepo.findByUsername(username).getEmail();
        return ResponseEntity.ok(email);
    }

    @RequestMapping(value = "/setNotifications", method = RequestMethod.POST)
    public ResponseEntity<?> SetNotifications(@RequestHeader("Authorization") String jwt, @RequestBody NotificationRequest conditions){
        System.out.println("Set up notifications for: " + conditions.getConditions());
        String username = jwtUtil.extractUsername(jwt.substring(7));
        UsersDocument usersDocument = usersRepo.findByUsername(username);
        try{
            emailService.sendSetUpNotificationsEmail(usersDocument.getEmail(), conditions.getCityName(), conditions.getCityState(), conditions.getConditions());
            usersDocument.setSendNotifications("true");
            usersDocument.setNotificationConditions(conditions.getConditions());
            usersDocument.setNotificationCity(conditions.getCityName());
            usersDocument.setNotificationState(conditions.getCityState());
            usersRepo.save(usersDocument);
            return ResponseEntity.ok("success");
        } catch (Exception e){
            String simpleError = "There was an error setting up email notifications. Please check to ensure that you have the correct email in your account info page.";
            if (e.getMessage().contains("Invalid Address")){
                simpleError = "The provided email address was invalid. Please check to ensure that you have the correct email in your account info page.";
            }
            return ResponseEntity.ok(simpleError);
        }
    }

    public String formatConditions(){
        return "";
    }

    //cancel notifications from account page
    @RequestMapping(value = "/cancelnotifications", method = RequestMethod.POST)
    public ResponseEntity<?> CancelNotifications(@RequestHeader("Authorization") String jwt){
        System.out.println("Cancel notifications");
        String username = jwtUtil.extractUsername(jwt.substring(7));
        UsersDocument usersDocument = usersRepo.findByUsername(username);
        usersDocument.setSendNotifications("false");
        usersDocument.setNotificationConditions("");
        usersDocument.setNotificationCity("");
        usersDocument.setNotificationState("");
        usersRepo.save(usersDocument);
        return ResponseEntity.ok("Canceled notifications");
    }
    
}
