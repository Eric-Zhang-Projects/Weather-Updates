package com.example.backend.Responses;

import com.example.backend.Documents.Coordinates;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Component
public class FindCityResponse {

    private String city;
    private String stateId;
    private String stateName;
    private String countyName;
    private double lat;
    private double lng;
    private Integer population;
    private Integer density;
    private String timezone;
    private Integer ranking;
    
}
