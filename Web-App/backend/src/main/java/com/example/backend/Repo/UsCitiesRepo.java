package com.example.backend.Repo;

import java.util.List;

import com.example.backend.Documents.UsCitiesDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsCitiesRepo extends MongoRepository<UsCitiesDocument, Integer>{

    List<UsCitiesDocument> findByCityOrderByPopulationDesc(String city);

    
}
