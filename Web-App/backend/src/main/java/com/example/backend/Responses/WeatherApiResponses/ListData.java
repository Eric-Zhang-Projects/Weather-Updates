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
public class ListData {
    
    private Integer dt;
    private ListMain main;
    private ArrayList<ListWeather> weather;
    private ListClouds clouds;
    private ListWind wind;
    //private ListRain rain;
    //private ListSnow snow;
    
    private String visibility;
    private String pop;
    private String dt_txt;
}
