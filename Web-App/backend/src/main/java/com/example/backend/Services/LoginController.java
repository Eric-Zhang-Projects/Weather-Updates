package com.example.backend.Services;

import java.util.List;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Responses.AuthenticationRequest;
import com.example.backend.Responses.AuthenticationResponse;
import com.example.backend.Responses.DashboardResponse;
import com.example.backend.Responses.DuplicateUserError;
import com.example.backend.Responses.LoginUser;
import com.example.backend.Responses.User;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;
import com.example.backend.Services.SecurityConfiguration.MyUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
// @RequestMapping("/api")
@Service
public class LoginController {

    @Autowired
    private User user;

    @Autowired
    private UsersDocument usersDocument;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private DashboardResponse dashboardResponse;

    @Autowired
    private AuthenticationResponse authenticationResponse;

    @Autowired
    private UsersRepo usersRepo;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity <?> Register(@RequestBody User user) {
        UsersDocument usersDocument = new UsersDocument();
        usersDocument.setName(user.getName());
        usersDocument.setEmail(user.getEmail());
        usersDocument.setUsername(user.getUsername());
        usersDocument.setPassword(user.getPassword());
        usersDocument.setCity("");
        usersDocument.setZip("");
        DuplicateUserError duplicateUserError = new DuplicateUserError();
        List<UsersDocument> listofExistingUsers = usersRepo.findByUsernameOrEmail(user.getUsername(), user.getEmail());
        System.out.println("size of list: " + listofExistingUsers.size());
         if (listofExistingUsers.isEmpty()){
             System.out.println("Unique user registration");
            // usersRepo.save(usersDocument);
         }
         else{
             System.out.println("checking list");
            listofExistingUsers.forEach((existingUser) ->{
                System.out.println("exist user: " + existingUser.getUsername() + " " + user.getUsername());
                if (existingUser.getUsername().equals(user.getUsername())){
                    System.out.println("dup username");
                    duplicateUserError.setDuplicateUsername("Current Userame is unavailable");
                }
                if (existingUser.getEmail().equals(user.getEmail())){
                    System.out.println("dup emial");
                    duplicateUserError.setDuplicateEmail("Current Email is already in use");
                }
            }); 
            return ResponseEntity.ok(duplicateUserError); 
         }
         return ResponseEntity.ok(duplicateUserError);

    }

    @RequestMapping("/login")
    public String Login(){
        System.out.println("hit login");
        return "logged in!";
    }

    @RequestMapping("/dashboard")
    public DashboardResponse Dashboard(){
        System.out.println("hit dashboard");
        DashboardResponse dashboardResponse = new DashboardResponse();
        dashboardResponse.setGreeting("hey bro whats good");
        return dashboardResponse;
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try{
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e){
            throw new Exception("Incorrect username or password", e);
        }

        if (!usersRepo.findById(authenticationRequest.getUsername()).isEmpty()){
            //username is 
        }
        
        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);
        System.out.println("creating new jwt:" + jwt);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Expose-Headers", 
          "Authorization");
          //return ResponseEntity.ok(new AuthenticationResponse(jwt));
          AuthenticationResponse authenticationResponse = new AuthenticationResponse();
          authenticationResponse.setJwt(jwt);
         return authenticationResponse;
        //return ResponseEntity.ok().headers(responseHeaders).body(new AuthenticationResponse(jwt));
    }

    
}