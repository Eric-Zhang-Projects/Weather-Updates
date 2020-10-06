package com.example.backend.Documents;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class Coordinates {

    private double lon;
    private double lat;
    
}
