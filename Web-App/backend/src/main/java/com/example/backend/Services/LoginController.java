package com.example.backend.Services;

import com.example.backend.Responses.RegisterUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Service
public class LoginController {

    @Autowired
    private RegisterUser registerUser;

    @RequestMapping("/register")
    public String Register(){
        return "registered!";
    }

    @RequestMapping("/login")
    public String Login(){
        return "logged in!";
    }

    
}