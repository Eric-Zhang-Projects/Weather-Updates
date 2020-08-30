package com.example.backend.Responses;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Component
public class RegisterUser {
    
    private String username;
    private String password;
    private String name;
    private String city;
    private String zip;
    private String email;

}