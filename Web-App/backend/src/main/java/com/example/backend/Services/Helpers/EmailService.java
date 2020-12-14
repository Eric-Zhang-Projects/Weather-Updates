package com.example.backend.Services.Helpers;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String to, String cityName, String cityState, String conditions) {

        //SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage message = javaMailSender.createMimeMessage();
        String htmlMessage =
        "<h1>Greetings from the Weather-Updater!</h1>" +
        "<p>This email is to confirm that you have signed up to recieve weather updates for:</p>" + 
        "<p><b>" + cityName + ", " + cityState + "</b></p>" +
        "<p>if the weather suddenly changes to the following condition(s):</p>" +
        "<p><b>" + conditions + "</b></p>" +
        "<hr/>" +
        "<p><a href = 'http://localhost:3000/login'>Click here to cancel alerts</a></p>"
        ;
        
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setFrom("weatherupdater-noreply@gmail.com");
            helper.setTo(to);
            helper.setSubject("Welcome to your new Weather Updates!");
            helper.setText(htmlMessage, true);
        } catch (Exception e){
            System.out.println("Failed to create message");
        }

        javaMailSender.send(message);
    }
}