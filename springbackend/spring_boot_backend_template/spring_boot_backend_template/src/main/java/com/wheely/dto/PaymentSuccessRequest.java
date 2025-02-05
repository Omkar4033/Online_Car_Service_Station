package com.wheely.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSuccessRequest {
    private String paymentId;      // Unique identifier for the payment
    private String orderId;        // The order ID associated with the payment
    private String payerId;        // The unique ID of the payer
    private String status;         // Payment status (e.g., success, failure, etc.)
    private double amount;         // The amount paid
    private String currency;       // Currency used for the payment (e.g., USD, INR)
    private String paymentMethod;  // Payment method (e.g., credit card, PayPal, etc.)
}
