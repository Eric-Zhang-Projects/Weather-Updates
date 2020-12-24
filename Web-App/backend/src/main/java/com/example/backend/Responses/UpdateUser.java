package com.example.backend.Responses;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class UpdateUser {
 
    private String oldUsername;
    //private String oldPassword;
    private String oldName;
    private String oldEmail;
    private String newUsername;
    private String newPassword;
    private String newName;
    private String newEmail;
}
