package com.example.backend.Responses.WeatherForecastResponses;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DayResponse {
    
    private float temp;
    private float feelsLike;
    private float humidity;
    private List<String> descriptions = new ArrayList<>();
    private String dateTime;

}
