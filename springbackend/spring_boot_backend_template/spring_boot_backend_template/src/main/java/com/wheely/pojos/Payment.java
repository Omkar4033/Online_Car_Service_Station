package com.blogs.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Payments")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Payment_ID")
    private Long paymentId; // Changed to camelCase for Java convention

    @Column(name = "Amount", nullable = false) // Assuming amount cannot be null
    private Double amount;

    @Column(name = "Payment_Date", nullable = false) // Fixed typo
    private LocalDate paymentDate;

    @Column(name = "Payment_Status", nullable = false) // Assuming payment_status cannot be null
    private String paymentStatus;
}
