package com.wheely.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wheely.dto.ContactUsDTO;
import com.wheely.service.ContactUsService;

@RestController
@RequestMapping("/api/contact-us")
public class ContactUsController {

    @Autowired
    private ContactUsService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody ContactUsDTO request) {
        try {
            String subject = "New Contact Us Inquiry from " + request.getName();
            String messageBody = "Name: " + request.getName() + "\n"
                    + "Email: " + request.getEmail() + "\n"
                    + "Message: " + request.getMessage();

            // Send an email to the admin
            emailService.sendEmail("prajwalshinde1262@gmail.com", subject, messageBody);

            return ResponseEntity.ok("Message sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send message"+e.getMessage());
        }
    }
}

