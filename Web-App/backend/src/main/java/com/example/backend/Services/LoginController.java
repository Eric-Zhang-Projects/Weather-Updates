package com.example.backend.Services;

import java.util.List;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Responses.AuthenticationRequest;
import com.example.backend.Responses.AuthenticationResponse;
import com.example.backend.Responses.DashboardResponse;
import com.example.backend.Responses.RegisterUser;
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
    private RegisterUser registerUser;

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
    public ResponseEntity <?> Register(@RequestBody RegisterUser registerUser) {
        UsersDocument usersDocument = new UsersDocument();
        usersDocument.setName(registerUser.getName());
        usersDocument.setEmail(registerUser.getEmail());
        usersDocument.setUsername(registerUser.getUsername());
        usersDocument.setPassword(registerUser.getPassword());
        usersDocument.setCity("");
        usersDocument.setZip("");
        usersRepo.save(usersDocument);
        return ResponseEntity.ok(registerUser);
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