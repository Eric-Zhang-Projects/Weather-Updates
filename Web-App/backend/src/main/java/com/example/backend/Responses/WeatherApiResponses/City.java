package com.example.backend.Responses.WeatherApiResponses;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class City {

    private int id;
    private String name;
    private String country;
        
    
}
