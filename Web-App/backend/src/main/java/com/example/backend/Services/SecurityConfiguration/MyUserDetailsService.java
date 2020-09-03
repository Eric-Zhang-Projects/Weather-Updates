package com.example.backend.Services.SecurityConfiguration;

import java.util.ArrayList;

import com.example.backend.Repo.UsersRepo;
import com.example.backend.Responses.LoginUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    private LoginUser loginUser;

    @Autowired
    private UsersRepo usersRepo;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new User(username, usersRepo.findByUsername(username).getPassword(), new ArrayList<>());
    }
    
}