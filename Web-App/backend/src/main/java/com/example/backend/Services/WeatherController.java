package com.example.backend.Services;

import java.util.ArrayList;
import java.util.List;

import com.example.backend.Documents.CitiesDocument;
import com.example.backend.Documents.Coordinates;
import com.example.backend.Documents.CountriesDocument;
import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.CitiesRepo;
import com.example.backend.Repo.CountriesRepo;
import com.example.backend.Repo.UsCitiesRepo;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Requests.FindCityRequest;
import com.example.backend.Requests.GetWeatherForCityRequest;
import com.example.backend.Responses.DashboardResponse;
import com.example.backend.Responses.DuplicateUserError;
import com.example.backend.Responses.FindCityResponse;
import com.example.backend.Responses.UpdateUser;
import com.example.backend.Responses.User;
import com.example.backend.Responses.WeatherApiResponses.ListData;
import com.example.backend.Responses.WeatherApiResponses.ApiForecastResponse;
import com.example.backend.Responses.WeatherForecastResponses.DayResponse;
import com.example.backend.Responses.WeatherForecastResponses.WeatherResponse;
import com.example.backend.Responses.WeatherForecastResponses.ForecastResponse;
import com.example.backend.Services.Helpers.ExistingUserCheck;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;

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
    private CountriesRepo countriesRepo;

    @Autowired 
    private CitiesRepo citiesRepo;

    @Autowired
    private UsCitiesRepo usCitiesRepo;

    // @RequestMapping("/countries")
    // public ResponseEntity<?> GetCountries(){
    //     System.out.println("hit countries");
    //     List<CountriesDocument> countries = countriesRepo.findAll();
    //     return ResponseEntity.ok(countries);
    // }

    // @RequestMapping("/cities")
    // public ResponseEntity<?> GetCities(@RequestBody String country){
    //     System.out.println("Hit cities " + country);
    //     //Return list of cities
    //     List<CitiesDocument> cities = citiesRepo.findFirst100ByCountry(country);
    //     return ResponseEntity.ok(cities);
    // }

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
        // List<CitiesDocument> cities = citiesRepo.findByName(formatted.trim());
        // List<FindCityResponse> citiesResponse = new ArrayList<>();
        // cities.stream().forEach(cityDocument -> {
        //     FindCityResponse cityResponse = new FindCityResponse();
        //     cityResponse.setId(cityDocument.getId());
        //     cityResponse.setName(cityDocument.getName());
        //     cityResponse.setCountry(cityDocument.getCountry());
        //     cityResponse.setCoord(cityDocument.getCoord());
        //     cityResponse.setAdministrativeAreaLevel("");
        //     citiesResponse.add(cityResponse);
        // });
        // if (citiesResponse.size() > 0){
        //     return ResponseEntity.ok(citiesResponse);
        // }
        // else {
        //     return ResponseEntity.ok(citiesResponse);
        // }
    }

    //Show Weather data for a specific city after searchResults page
    @RequestMapping("/getWeatherForCity")
    public ResponseEntity<?> GetWeatherForCity(@RequestBody GetWeatherForCityRequest cityWeatherRequest){
        //access api call
        System.out.println("hit weather search");
        RestTemplate restTemplate = new RestTemplate();
        String uri = "http://api.openweathermap.org/data/2.5/forecast?";
        if (cityWeatherRequest.getCityName() != null && cityWeatherRequest.getCityState() != null){
            uri += "q=" + cityWeatherRequest.getCityName() + "," + cityWeatherRequest.getCityState() + ",us&units=imperial&appid=" + apiKey;
        }
        // else if (cityWeatherRequest.getZip() != null){
        //     uri += "zip=" + weatherSearch.getZip() + "&units=imperial&appid=" + apiKey;
        // }
        // else if (weatherSearch.getGeoCoordinates() !=null ){
        //     uri += weatherSearch.getGeoCoordinates() + "&units=imperial&appid=" + apiKey;
        // }
        System.out.println("uri at: " + uri);
        ResponseEntity<ApiForecastResponse> apiForecastResponse = restTemplate.exchange(
            uri, HttpMethod.GET, null,
            new ParameterizedTypeReference<ApiForecastResponse>(){});

        ApiForecastResponse result = apiForecastResponse.getBody();
        return ResponseEntity.ok(formatWeatherResponse(result));
    }

    public WeatherResponse formatWeatherResponse(ApiForecastResponse result){
        WeatherResponse weatherResponse = new WeatherResponse();
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
    
}
