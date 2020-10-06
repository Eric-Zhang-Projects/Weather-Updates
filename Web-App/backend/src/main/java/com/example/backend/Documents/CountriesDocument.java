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
@Document(collection = "Countries")
public class CountriesDocument {

    private String code;
    private String name;
}
