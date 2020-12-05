package com.example.backend.Responses.WeatherForecastResponses;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class WeatherResponse {

    //Used to store in db to query weather faster for repeated searches
    private Integer id;
    private String cityName;
    private String cityState;
    
    private List<DayResponse> dayResponse = new ArrayList<>();
    private List<ForecastResponse> forecastResponse = new ArrayList<>();

}
