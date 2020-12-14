package com.example.backend.Repo;

import java.util.List;

import com.example.backend.Documents.UsersDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsersRepo extends MongoRepository<UsersDocument, String>{

    //https://docs.spring.io/spring-data/mongodb/docs/1.2.0.RELEASE/reference/html/mongo.repositories.html

    //Register Query to check unique register info
    public List<UsersDocument> findByUsernameOrEmail(String username, String email);

    //Login Query
    public UsersDocument findByUsernameAndPassword(String username, String password);

    //Authentication Query, Account info page query
    public UsersDocument findByUsername(String username);

    public UsersDocument findByEmail(String email);

    public UsersDocument deleteByUsername(String username);

    //public UsersDocument findByUsernameAndSendNotifications(String username, Boolean sendNotifications);
    
}