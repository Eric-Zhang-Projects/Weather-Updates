package com.example.backend.Responses.WeatherApiResponses;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ListDateTime {

    private String dt_txt;
    
}
