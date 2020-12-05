package com.example.backend.Responses;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class User {
    
    @Id
    private String username;
    private String password;
    private String name;
    private String city;
    private String zip;
    private String email;

}