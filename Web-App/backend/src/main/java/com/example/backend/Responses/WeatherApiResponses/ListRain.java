package com.example.backend.Responses.WeatherApiResponses;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ListRain {

    @JsonProperty("404_StartingWithADigit")
    private float rain;
    
}
