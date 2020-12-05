package com.example.backend.Responses.WeatherApiResponses;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ApiForecastResponse {

    private City city;
    private ArrayList<ListData> list = new ArrayList<>();  
    
}