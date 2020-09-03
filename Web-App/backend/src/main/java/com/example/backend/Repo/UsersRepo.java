package com.example.backend.Repo;

import java.util.List;

import com.example.backend.Documents.UsersDocument;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UsersRepo extends MongoRepository<UsersDocument, String>{

    //https://docs.spring.io/spring-data/mongodb/docs/1.2.0.RELEASE/reference/html/mongo.repositories.html

    //Register Query to check unique register info'
    public List<UsersDocument> findByUsernameOrEmail(String username, String email);


//     Login Query
//    @Query()
//    User checkLoginCredentials(String username, String password);


    
}