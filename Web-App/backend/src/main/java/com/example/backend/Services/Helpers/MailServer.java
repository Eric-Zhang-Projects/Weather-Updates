// package com.example.backend.Services.Helpers;

// import java.util.Properties;

// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.context.annotation.Bean;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.JavaMailSenderImpl;

// public class MailServer {
    
//     @Value("${GMAIL}")
//     private String gmailUsername;

//     @Value("${GMAIL_PASSWORD}")
//     private String gmailPassword;

//     @Bean
//     public JavaMailSender getJavaMailSender() {
//         JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//         mailSender.setHost("smtp.gmail.com");
//         mailSender.setPort(587);
        
//         mailSender.setUsername(gmailUsername);
//         mailSender.setPassword(gmailPassword);
        
//         Properties props = mailSender.getJavaMailProperties();
//         props.put("mail.transport.protocol", "smtp");
//         props.put("mail.smtp.auth", "true");
//         props.put("mail.smtp.starttls.enable", "true");
//         props.put("mail.debug", "true");
        
//         return mailSender;
//     }

// }
