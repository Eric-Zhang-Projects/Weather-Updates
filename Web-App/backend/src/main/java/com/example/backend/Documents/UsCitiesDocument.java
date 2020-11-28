package com.example.backend.Documents;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
@Document(collection = "UsCities")
public class UsCitiesDocument {

    private String city;
    private String state_id;
    private String state_name;
    private String county_name;
    private double lat;
    private double lng;
    private Integer population;
    private Integer density;
    private String timezone;
    private Integer ranking;

    
}
