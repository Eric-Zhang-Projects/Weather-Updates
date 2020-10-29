package com.example.backend.Repo;

import java.util.List;

import com.example.backend.Documents.CitiesDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CitiesRepo extends MongoRepository<CitiesDocument, Integer>{
    
    List<CitiesDocument> findFirst100ByCountry(String country);

    List<CitiesDocument> findByName(String city);
}
