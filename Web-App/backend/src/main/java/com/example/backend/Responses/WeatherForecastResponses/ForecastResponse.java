package com.example.backend.Responses.WeatherForecastResponses;

import java.util.Set;
import java.util.TreeSet;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ForecastResponse {
    
    private float avgTemp;
    private float minTemp;
    private float maxTemp;
    private Set<String> descriptions = new TreeSet<>();

}
