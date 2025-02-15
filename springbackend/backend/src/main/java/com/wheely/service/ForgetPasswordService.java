package com.wheely.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wheely.dto.ResponseMessageDTO;
import com.wheely.service.interfaces.ForgetPasswordServiceInterface;

@Service
public class ForgetPasswordService implements ForgetPasswordServiceInterface {

    @Autowired
    private ContactUsService emailService;

    private final Random random = new SecureRandom();
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> otpExpiry = new ConcurrentHashMap<>();

    @Override
    public ResponseMessageDTO sendOtp(String email) {
        String otp = String.format("%06d", random.nextInt(1000000));
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(5);

        otpStorage.put(email, otp);
        otpExpiry.put(email, expiryTime);

        emailService.sendEmail(email, "Password Reset OTP", "Your OTP is: " + otp);

        return new ResponseMessageDTO("OTP sent successfully.");
    }

    @Override
    public ResponseMessageDTO verifyOtp(String email, String otp) {
        if (!otpStorage.containsKey(email) || !otpStorage.get(email).equals(otp)) {
            return new ResponseMessageDTO("Invalid OTP.");
        }

        if (otpExpiry.get(email).isBefore(LocalDateTime.now())) {
            otpStorage.remove(email);
            otpExpiry.remove(email);
            return new ResponseMessageDTO("OTP expired.");
        }

        otpStorage.remove(email);
        otpExpiry.remove(email);
        return new ResponseMessageDTO("OTP verified successfully.");
    }
}
