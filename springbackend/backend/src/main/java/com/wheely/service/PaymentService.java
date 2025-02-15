package com.wheely.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.wheely.dto.PaymentRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    public PaymentIntent createPaymentIntent(PaymentRequestDTO paymentRequestDTO) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentRequestDTO.getAmount() * 100); 
        params.put("currency", paymentRequestDTO.getCurrency());
        params.put("payment_method_types", java.util.Arrays.asList("card"));

        return PaymentIntent.create(params);
    }
}
