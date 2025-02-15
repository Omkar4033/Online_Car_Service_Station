package com.wheely.service.interfaces;

import com.wheely.dto.ResponseMessageDTO;

public interface ForgetPasswordServiceInterface {
    ResponseMessageDTO sendOtp(String email);
    ResponseMessageDTO verifyOtp(String email, String otp);
}
