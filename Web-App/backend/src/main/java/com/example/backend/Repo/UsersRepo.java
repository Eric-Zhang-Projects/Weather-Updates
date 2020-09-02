package com.example.backend.Repo;

import com.example.backend.Documents.UsersDocument;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepo extends MongoRepository<UsersDocument, String>{
    
}