package com.example.backend.Responses.WeatherResponses;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ListWind {
    
    private float speed;
    private int deg;
}
