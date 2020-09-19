package com.example.backend.Responses.WeatherResponses;

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
public class ForecastResponse {

    private City city;
    private ArrayList<ListData> list = new ArrayList<>();  
    
}