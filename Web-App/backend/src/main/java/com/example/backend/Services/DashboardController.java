package com.example.backend.Services;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Responses.DashboardResponse;
import com.example.backend.Responses.DuplicateUserError;
import com.example.backend.Responses.UpdateUser;
import com.example.backend.Responses.User;
import com.example.backend.Services.Helpers.ExistingUserCheck;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;

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
    private DashboardResponse dashboardResponse;

    @Autowired
    private ExistingUserCheck existingUserCheck;

    @RequestMapping("/dashboard")
    public ResponseEntity<?> Dashboard(){
        System.out.println("hit dashboard");
        DashboardResponse dashboardResponse = new DashboardResponse();
        dashboardResponse.setGreeting("hey bro whats good");
        return ResponseEntity.ok(dashboardResponse);
    }


    @RequestMapping("/account")
    public UsersDocument Account(@RequestHeader("Authorization") String jwt){
        String username = jwtUtil.extractUsername(jwt.substring(7));
        System.out.println("username: " + username);
        return usersRepo.findByUsername(username);
        
    }

    @RequestMapping(value = "/updateInfo", method = RequestMethod.POST)
    public ResponseEntity<?> UpdateInfo(@RequestHeader("Authorization") String jwt, @RequestBody UpdateUser user){
        System.out.println("hit update info");
       // String username = jwtUtil.extractUsername(jwt.substring(7));
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
        if (!currentInfo.getUsername().equals(user.getNewUsername()) || !currentInfo.getEmail().equals(user.getNewEmail())){
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
}