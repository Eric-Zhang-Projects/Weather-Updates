package com.example.backend.Services;

import java.util.ArrayList;
import java.util.List;

import com.example.backend.Documents.CitiesDocument;
import com.example.backend.Documents.CountriesDocument;
import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.CitiesRepo;
import com.example.backend.Repo.CountriesRepo;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Requests.FindCityRequest;
import com.example.backend.Responses.DashboardResponse;
import com.example.backend.Responses.DuplicateUserError;
import com.example.backend.Responses.UpdateUser;
import com.example.backend.Responses.User;
import com.example.backend.Responses.WeatherSearch;
import com.example.backend.Responses.WeatherResponses.ForecastResponse;
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

    @RequestMapping("/countries")
    public ResponseEntity<?> GetCountries(){
        System.out.println("hit countries");
        List<CountriesDocument> countries = countriesRepo.findAll();
        return ResponseEntity.ok(countries);
    }

    @RequestMapping("/cities")
    public ResponseEntity<?> GetCities(@RequestBody String country){
        System.out.println("Hit cities " + country);
        //Return list of cities
        List<CitiesDocument> cities = citiesRepo.findFirst100ByCountry(country);
        return ResponseEntity.ok(cities);
    }

    @RequestMapping("/findCity")
    public ResponseEntity<?> FindCity(@RequestBody FindCityRequest city){
        String formatted = city.getCity().substring(0, 1).toUpperCase() + city.getCity().substring(1).toLowerCase();
        System.out.println("Searching for city: " + formatted);
        List<CitiesDocument> cities = citiesRepo.findByName(formatted);
        if (cities.size() > 0){
            return ResponseEntity.ok(cities);
        }
        else {
            return ResponseEntity.ok(cities);
        }
    }

    @RequestMapping("/search")
    public ResponseEntity<?> ExecuteSearch(String country, String city, String zip){
        //access api call
        System.out.println("hit weather search");
        // WeatherSearch weatherSearch = new WeatherSearch();
        // weatherSearch.setZip("08550");
        // RestTemplate restTemplate = new RestTemplate();
        // String uri = "http://api.openweathermap.org/data/2.5/forecast?";
        // if (weatherSearch.getCityName() != null){
        //     uri += "q=" + weatherSearch.getCityName() + "&units=imperial&appid=" + apiKey;
        // }
        // else if (weatherSearch.getZip() != null){
        //     uri += "zip=" + weatherSearch.getZip() + "&units=imperial&appid=" + apiKey;
        // }
        // else if (weatherSearch.getGeoCoordinates() !=null ){
        //     uri += weatherSearch.getGeoCoordinates() + "&units=imperial&appid=" + apiKey;
        // }
        // System.out.println("uri at: " + uri);
        // ResponseEntity<ForecastResponse> forecastResponse = restTemplate.exchange(
        //     uri, HttpMethod.GET, null,
        //     new ParameterizedTypeReference<ForecastResponse>(){});

        // ForecastResponse result = forecastResponse.getBody();
        // System.out.println("feels like" + result.getList().get(0).getMain().getFeels_like());
        // System.out.println("des " + result.getList().get(0).getWeather().get(0).getDescription());
        // System.out.println("? " + result.getCity().getId() + " at" +  result.getCity().getName());
        // System.out.println("dt " + result.getList().get(0).getDt_txt());
        DashboardResponse dashboardResponse = new DashboardResponse();
        dashboardResponse.setGreeting("hey bro whats good");
             ForecastResponse result = new ForecastResponse();

        return ResponseEntity.ok(result);
    }
    
}
