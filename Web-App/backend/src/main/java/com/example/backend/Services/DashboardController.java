package com.example.backend.Services;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Responses.DashboardResponse;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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
}