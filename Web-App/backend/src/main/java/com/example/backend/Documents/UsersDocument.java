package com.example.backend.Documents;

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
@Document(collection = "Users")
public class UsersDocument {
    
    @Id
    private String id;

    private String username;
    private String password;
    private String name;
    private String city;
    private String state;
    private String sendNotifications;
    private String email;
    private String notificationCity;
    private String notificationState;
    private String notificationConditions;
}