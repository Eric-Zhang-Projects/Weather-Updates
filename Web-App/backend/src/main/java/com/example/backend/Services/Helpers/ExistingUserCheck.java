package com.example.backend.Services.Helpers;

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
  
        if (usersRepo.findByUsername(username) != null){
            System.out.println("duplicate username");
            duplicateUserError.setDuplicateUsername("Userame is unavailable");
        }
        if (usersRepo.findByEmail(email) != null){
            System.out.println("duplicate username");
            duplicateUserError.setDuplicateEmail("Email is already in use");
        }

        return duplicateUserError;
    }
}
