package com.example.backend.Services;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {


    @RequestMapping("/login")
    public String Login(){
        return "test";
    }

    
}