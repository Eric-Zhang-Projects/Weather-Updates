package com.example.backend.Documents;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
@Document(collection = "Cities")
public class CitiesDocument {

    @Id
    private ObjectId _id;
    private int id;
    private String name;
    private String country;
    private Coordinates coord; 
    
}
