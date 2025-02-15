package com.wheely.service.interfaces;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.wheely.dto.PaymentRequestDTO;

public interface PaymentServiceInterface {
    PaymentIntent createPaymentIntent(PaymentRequestDTO paymentRequestDTO) throws StripeException;
}
