package com.example.backend.Services.Helpers;

import java.util.Base64;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class EmailService {

    @Value("${BASE_URL}")
    private String baseUrl;

    private JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public String createEncodedUrl(String email, String endpoint){
        String url = baseUrl + endpoint;
                //String emailEncoded = URLEncoder.encode(forgotPasswordRequest.getEmail(), StandardCharsets.UTF_8.name());
        String emailBase64 = Base64.getEncoder().encodeToString(email.getBytes());
        return url + emailBase64;
    }

    public void sendSetUpNotificationsEmail(String to, String cityName, String cityState, String conditions) {
        MimeMessage message = javaMailSender.createMimeMessage();
        String htmlMessage =
        "<h1>Greetings from the Weather-Updater!</h1>" +
        "<p>This email is to confirm that you have signed up to recieve weather updates for:</p>" + 
        "<p><b>" + cityName + ", " + cityState + "</b></p>" +
        "<p>if the weather suddenly changes to the following condition(s):</p>" +
        "<p><b>" + conditions + "</b></p>" +
        "<hr/>" +
        "<p><a href = '" + createEncodedUrl(to, "/cancelnotificationsbyemail?q=") + "'>Click here to cancel alerts</a></p>"
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

    public void sendUpdateEmail(String to, String cityName, String cityState, String conditions, String details) {
        MimeMessage message = javaMailSender.createMimeMessage();
        String htmlMessage =
        "<h1>Updates from the Weather-Updater!</h1>" +
        "<p>This email is to alert you that for your location of:</p>" + 
        "<p><b>" + cityName + ", " + cityState + ",</b></p>" +
        "<p>that the weather has now changed to match your request condition(s) of:</p>" +
        "<p><b>" + conditions + "</b></p>" +
        "<p>Details:</p>" +
        "<p>" + details +"</p>" +
        "<hr/>" +
        "<p><a href = '" + createEncodedUrl(to, "/cancelnotificationsbyemail?q=") + "'>Click here to cancel alerts</a></p>"
        ;
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
            helper.setFrom("weatherupdater-noreply@gmail.com");
            helper.setTo(to);
            helper.setSubject("Weather Updates for " + cityName + ", " + cityState + "!");
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
        "<p><a href = '" + createEncodedUrl(to, "/confirmEmail?q=") + "'>Reset Login Info</a></p>"
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