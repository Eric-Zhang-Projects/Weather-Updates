package com.example.backend.Services.Helpers;

import javax.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

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
        "<p><a href = 'http://localhost:3000/cancelnotifications'>Click here to cancel alerts</a></p>"
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

    public void sendForgotPasswordEmail(String to){
        MimeMessage message = javaMailSender.createMimeMessage();
        String htmlMessage =
        "<h1>Greetings from the Weather-Updater!</h1>" +
        "<p>Click the link below to update your login credentials:</p>" + 
        "<p><a href = 'http://localhost:3000/confirmEmail'>Reset Login Info</a></p>"
        ;
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setFrom("weatherupdater-noreply@gmail.com");
            helper.setTo(to);
            helper.setSubject("Reset your Weather Updater Login Info");
            helper.setText(htmlMessage, true);
        } catch (Exception e){
            System.out.println("Failed to create message");
        }
        javaMailSender.send(message);
    }
}