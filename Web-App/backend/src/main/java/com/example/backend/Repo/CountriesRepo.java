package com.example.backend.Repo;

import com.example.backend.Documents.CountriesDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CountriesRepo extends MongoRepository<CountriesDocument, String>{

}