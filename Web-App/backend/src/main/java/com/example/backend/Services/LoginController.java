package com.example.backend.Services;

import java.util.Objects;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Requests.AuthenticationRequest;
import com.example.backend.Requests.ForgotPasswordRequest;
import com.example.backend.Responses.AuthenticationResponse;
import com.example.backend.Responses.DuplicateUserError;
import com.example.backend.Responses.User;
import com.example.backend.Services.Helpers.EmailService;
import com.example.backend.Services.Helpers.ExistingUserCheck;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;
import com.example.backend.Services.SecurityConfiguration.MyUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@Service
public class LoginController {

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private ExistingUserCheck existingUserCheck;

    @Autowired
    private EmailService emailSerivce;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity <?> Register(@RequestBody User user) {
        UsersDocument usersDocument = new UsersDocument();
        usersDocument.setName(user.getName());
        usersDocument.setEmail(user.getEmail());
        usersDocument.setUsername(user.getUsername());
        usersDocument.setPassword(user.getPassword());
        usersDocument.setCity("");
        usersDocument.setState("");
        usersDocument.setSendNotifications("");
        usersDocument.setNotificationCity("");
        usersDocument.setNotificationState("");
        usersDocument.setNotificationConditions("");

        DuplicateUserError duplicateUserError = existingUserCheck.findDuplicateUsers(usersDocument.getUsername(), usersDocument.getEmail());
        if (duplicateUserError.getDuplicateEmail()==null && duplicateUserError.getDuplicateUsername()==null){
            usersRepo.save(usersDocument);
        }
        return ResponseEntity.ok(duplicateUserError);
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
       
       //commented out- when entering bad login credentials routes through here instead of if statement below with print statemnt "bad login etc"
        // try{
        //     authenticationManager.authenticate(
        //         new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword())
        //     );
        // } catch (BadCredentialsException e){
        //     System.out.println("bad login");
        //     throw new Exception("Incorrect username or password", e);
        // }

        if (usersRepo.findByUsernameAndPassword(authenticationRequest.getUsername(), authenticationRequest.getPassword()) == null){
           System.out.println("Bad Login Credentials");
            return null;
        }
        
        System.out.println("Valid Login Credentials");

        final UserDetails userDetails = myUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);
        System.out.println("creating new jwt:" + jwt);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        authenticationResponse.setJwt(jwt);
        return ResponseEntity.ok().body(authenticationResponse);
    }

    @RequestMapping(value = "/forgotpassword", method = RequestMethod.POST)
    public ResponseEntity<?> ForgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest){
        System.out.println("hit forgot password for email: " + forgotPasswordRequest.getEmail());
        if(Objects.nonNull(usersRepo.findByEmail(forgotPasswordRequest.getEmail()))){
            try{
                emailSerivce.sendForgotPasswordEmail(forgotPasswordRequest.getEmail());
                return ResponseEntity.ok("Success!");
            } catch (Exception e){
                String simpleError = "There was an error trying to send you the recovery email.";
                if (e.getMessage().contains("Invalid Address")){
                    simpleError = "The provided email address was invalid. Please try again.";
                }
                return ResponseEntity.ok(simpleError);
            }
        } else {
            System.out.println("not found");
            return ResponseEntity.ok("No email was detected in our records.");
        }

    }
       
    
}