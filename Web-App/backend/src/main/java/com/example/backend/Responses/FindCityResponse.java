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

    private int id;
    private String name;
    private String country;
    private Coordinates coord; 
    private String administrativeAreaLevel;
    
}
