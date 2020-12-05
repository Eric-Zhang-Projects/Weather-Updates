package com.example.backend.Services;

import java.util.Objects;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Requests.GetWeatherForCityRequest;
import com.example.backend.Responses.DuplicateUserError;
import com.example.backend.Responses.UpdateUser;
import com.example.backend.Responses.WeatherApiResponses.ApiForecastResponse;
import com.example.backend.Services.Helpers.ExistingUserCheck;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;
import com.example.backend.cache.CityDataCache;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Service
public class DashboardController {
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private ExistingUserCheck existingUserCheck;

    @Autowired
    private WeatherController weatherController;

    @Autowired
    private CityDataCache cityDataCache;

    @RequestMapping("/dashboard")
    public ResponseEntity<?> Dashboard(@RequestHeader("Authorization") String jwt){
        //Dashboard will load user's city weather info, or if n/a some random city info
        System.out.println("hit dashboard");
        if (Objects.isNull(cityDataCache.getDefaultCity())){
            System.out.println("returning new default city");
            String username = jwtUtil.extractUsername(jwt.substring(7));
            UsersDocument usersDocument = usersRepo.findByUsername(username);
            if (usersDocument.getCity().equals("") || usersDocument.getState().equals("")){
                usersDocument.setCity("New York");
                usersDocument.setState("NY");
            }
            GetWeatherForCityRequest cityWeatherRequest = new GetWeatherForCityRequest();
            cityWeatherRequest.setCityName(usersDocument.getCity());
            cityWeatherRequest.setCityState(usersDocument.getState());
            ResponseEntity<?> defCity = weatherController.GetWeatherForCity(cityWeatherRequest);
            cityDataCache.setDefaultCity(defCity);
            return defCity;
        } else {
            System.out.println("returning default city");
            return cityDataCache.getDefaultCity();
        }
    }

    @RequestMapping("/account")
    public UsersDocument Account(@RequestHeader("Authorization") String jwt){
        String username = jwtUtil.extractUsername(jwt.substring(7));
        System.out.println("hit account");
        return usersRepo.findByUsername(username);
        
    }

    @RequestMapping(value = "/updateInfo", method = RequestMethod.POST)
    public ResponseEntity<?> UpdateInfo(@RequestBody UpdateUser user){
        System.out.println("hit update info");
       //Check by old username 
        UsersDocument currentInfo = usersRepo.findByUsername(user.getOldUsername());
        if (!user.getNewName().equals("")){
            currentInfo.setName(user.getNewName());
        }
        if (!user.getNewEmail().equals("")){
            currentInfo.setEmail(user.getNewEmail());
        }
        if (!user.getNewUsername().equals("")){
            currentInfo.setUsername(user.getNewUsername());
        }
        if (!user.getNewPassword().equals("")){
            currentInfo.setPassword(user.getNewPassword());
        }
        /*
        case 1. User only updates name, dont want to check existing entries, and just save new info over old info
        case 2. 
            a. User updates email, need to check if duplicate email
            b. user updates username, need to check if duplicate username
            c. user update both, need to check both

        */
        DuplicateUserError duplicateUserError = new DuplicateUserError();
        if (currentInfo.getUsername().equals(user.getNewUsername()) || currentInfo.getEmail().equals(user.getNewEmail())){
            duplicateUserError = existingUserCheck.findDuplicateUsers(user.getNewUsername(), user.getNewEmail());
            System.out.println("updating error: " + duplicateUserError.getDuplicateEmail() + " " + duplicateUserError.getDuplicateUsername());
            if (duplicateUserError.getDuplicateEmail()==null && duplicateUserError.getDuplicateUsername()==null){
                usersRepo.save(currentInfo);
            }
        }
        else{
            System.out.println("no duplicates in updating");
            usersRepo.save(currentInfo);
        }
        return ResponseEntity.ok(duplicateUserError);
    }

    @RequestMapping(value = "/deleteAccount", method = RequestMethod.POST)
    public ResponseEntity<?> DeleteUser(@RequestHeader("Authorization") String jwt){
        System.out.println("hit delete user");
        return ResponseEntity.ok(usersRepo.deleteByUsername(jwtUtil.extractUsername(jwt.substring(7))));
    }

    @RequestMapping(value = "/deletecache")
    public ResponseEntity<?> Logout(){
        System.out.println("logging out, deleting cache");
         cityDataCache.deleteCache();
        return ResponseEntity.ok("Deleted Cache");
    }
}