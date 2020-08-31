package com.example.backend.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins= "http://localhost:3000")
//@RequestMapping("/api")
@Service
public class DashboardController {
    
    @RequestMapping("/dasdhboard")
    public String Dashboard(){
        return "GREETINGS!";
    }
}