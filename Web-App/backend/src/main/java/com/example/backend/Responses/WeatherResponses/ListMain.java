package com.example.backend.Responses.WeatherResponses;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ListMain {
    
    private float temp;
    private float feels_like;
}
