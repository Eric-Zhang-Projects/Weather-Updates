package com.example.backend.Services;

import java.util.Base64;
import java.util.Objects;

import com.example.backend.Documents.UsersDocument;
import com.example.backend.Repo.UsersRepo;
import com.example.backend.Requests.AuthenticationRequest;
import com.example.backend.Requests.ForgotPasswordRequest;
import com.example.backend.Requests.ResetPasswordRequest;
import com.example.backend.Responses.AuthenticationResponse;
import com.example.backend.Responses.DuplicateUserError;
import com.example.backend.Responses.User;
import com.example.backend.Services.Helpers.EmailService;
import com.example.backend.Services.Helpers.ExistingUserCheck;
import com.example.backend.Services.SecurityConfiguration.JwtUtil;
import com.example.backend.Services.SecurityConfiguration.MyUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${BASE_URL}")
    private String baseUrl;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity <?> Register(@RequestBody User user) {
        UsersDocument usersDocument = new UsersDocument();
        usersDocument.setName(user.getName());
        usersDocument.setEmail(user.getEmail());
        usersDocument.setUsername(user.getUsername());
        usersDocument.setPassword(passwordEncoder.encode(user.getPassword()));
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

        UsersDocument authUser = usersRepo.findByUsername(authenticationRequest.getUsername());

        if(Objects.nonNull(authUser)){
            if (passwordEncoder.matches(authenticationRequest.getPassword(), authUser.getPassword())){
                System.out.println("Valid Login Credentials");

                final UserDetails userDetails = myUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        
                final String jwt = jwtUtil.generateToken(userDetails);
                System.out.println("creating new jwt:" + jwt);
                AuthenticationResponse authenticationResponse = new AuthenticationResponse();
                authenticationResponse.setJwt(jwt);
                return ResponseEntity.ok().body(authenticationResponse);
            }
        }
        System.out.println("bad log in credentials");
        return null;   
    }

    @RequestMapping(value = "/forgotpassword", method = RequestMethod.POST)
    public ResponseEntity<?> ForgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest){
        System.out.println("hit forgot password for email: " + forgotPasswordRequest.getEmail());
        if(Objects.nonNull(usersRepo.findByEmail(forgotPasswordRequest.getEmail()))){
            try{
                String url = baseUrl + "/confirmEmail?q=";
                //String emailEncoded = URLEncoder.encode(forgotPasswordRequest.getEmail(), StandardCharsets.UTF_8.name());
                String emailBase64 = Base64.getEncoder().encodeToString(forgotPasswordRequest.getEmail().getBytes());
                emailSerivce.sendForgotPasswordEmail(forgotPasswordRequest.getEmail(), url + emailBase64);
                return ResponseEntity.ok("Success");
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

    @RequestMapping(value = "/confirmemail", method = RequestMethod.POST)
    public ResponseEntity<?> ConfirmEmail(@RequestBody ForgotPasswordRequest confirmEmailRequest){
        System.out.println("hit confirm email for: " + confirmEmailRequest.getEmail());
        String decodedEmail = new String(Base64.getDecoder().decode(confirmEmailRequest.getEmail()));
        System.out.println("decoded: " + decodedEmail);
        if (Objects.nonNull(usersRepo.findByEmail(decodedEmail))){
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.ok("This email was not found in our records. Please try again.");
    }

    @RequestMapping(value = "/resetpassword", method = RequestMethod.POST)
    public ResponseEntity<?> ResetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest){
        System.out.println("hit reset password");
        String decodedEmail = new String(Base64.getDecoder().decode(resetPasswordRequest.getEmail()));
        UsersDocument usersDocument = usersRepo.findByEmail(decodedEmail);
        if (Objects.isNull(usersDocument)){
            return ResponseEntity.ok("Did not find email");
        }
        DuplicateUserError duplicateUserError = existingUserCheck.findDuplicateUsers(resetPasswordRequest.getNewUsername(), null);
        if (duplicateUserError.getDuplicateUsername()==null){
            usersDocument.setUsername(resetPasswordRequest.getNewUsername());
            usersDocument.setPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));
            usersRepo.save(usersDocument);
            return ResponseEntity.ok("success");
        }
        return ResponseEntity.ok(duplicateUserError.getDuplicateUsername());
    }
    
    @RequestMapping(value = "/cancelnotificationsbyemail", method = RequestMethod.POST)
    public ResponseEntity<?> CancelNotifications(@RequestBody ForgotPasswordRequest cancelNotificationsRequest){
        try{
            String decodedEmail = new String(Base64.getDecoder().decode(cancelNotificationsRequest.getEmail()));
            UsersDocument usersDocument = usersRepo.findByEmail(decodedEmail);
            if (Objects.nonNull(usersDocument)){
                usersDocument.setSendNotifications("false");
                usersDocument.setNotificationCity("");
                usersDocument.setNotificationState("");
                usersDocument.setNotificationConditions("");
                usersRepo.save(usersDocument);
                return ResponseEntity.ok("success");
            }
            return ResponseEntity.ok("This email was not found in our records. Please try again.");
        } catch (Exception e){
            return ResponseEntity.ok("This email was not found in our records. Please try again.");
        }
    }
}