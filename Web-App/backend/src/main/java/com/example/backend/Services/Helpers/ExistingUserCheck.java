package com.example.backend.Services.Helpers;

import java.util.List;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Responses.DuplicateUserError;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExistingUserCheck {
    
    @Autowired
    private UsersRepo usersRepo;

    public DuplicateUserError findDuplicateUsers(String username, String email){
    
        DuplicateUserError duplicateUserError = new DuplicateUserError();
        // List<UsersDocument> listofExistingUsers = usersRepo.findByUsernameOrEmail(user.getUsername(), user.getEmail());
        // if (!listofExistingUsers.isEmpty()){
        //     listofExistingUsers.forEach((existingUser) ->{
        //         if (existingUser.getUsername().equals(user.getUsername())){
        //             duplicateUserError.setDuplicateUsername("Current Userame is unavailable");
        //         }
        //         if (existingUser.getEmail().equals(user.getEmail())){
        //             duplicateUserError.setDuplicateEmail("Current Email is already in use");
        //         }
        //     }); 
        // }
        // UsersDocument checkDupUsername = usersRepo.findByUsername(user.getUsername());
        // UsersDocument checkDupEmail = usersRepo.findByEmail(user.getEmail());

        if (usersRepo.findByUsername(username) != null){
            System.out.println("duplicate username");
            duplicateUserError.setDuplicateUsername("Current Userame is unavailable");
        }
        if (usersRepo.findByEmail(email) != null){
            System.out.println("duplicate username");
            duplicateUserError.setDuplicateEmail("Current Email is already in use");
        }

        return duplicateUserError;
    }
}
