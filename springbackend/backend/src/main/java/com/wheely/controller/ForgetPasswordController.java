package com.wheely.controller;
import com.wheely.dto.ForgetPasswordDTO;
import com.wheely.dto.OtpVerificationDTO;
import com.wheely.dto.ResponseMessageDTO;
import com.wheely.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class ForgetPasswordController {

    @Autowired
    private ForgetPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<ResponseMessageDTO> sendOtp(@RequestBody ForgetPasswordDTO request) {
        return ResponseEntity.ok(forgotPasswordService.sendOtp(request.getEmail()));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ResponseMessageDTO> verifyOtp(@RequestBody OtpVerificationDTO request) {
        return ResponseEntity.ok(forgotPasswordService.verifyOtp(request.getEmail(), request.getOtp()));
    }
}
