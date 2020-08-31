package com.example.backend.Responses;

import lombok.Getter;
import lombok.NoArgsConstructor;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Component
public class AuthenticationResponse {
    
    private String jwt;
}