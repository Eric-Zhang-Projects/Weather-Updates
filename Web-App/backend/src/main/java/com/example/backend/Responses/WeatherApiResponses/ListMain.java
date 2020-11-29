package com.example.backend.Responses.WeatherApiResponses;

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
    private float temp_min;
    private float temp_max;
    private Integer humidity;
}
