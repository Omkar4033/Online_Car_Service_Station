package com.blogs.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "user") // Exclude user to avoid recursion in bidirectional relationship
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Car_ID")
    private Long carId;

    @Column(name = "Company", nullable = false, length = 50) // Make cannot be null
    private String company;

    @Column(name = "Model", nullable = false, length = 50) // Model cannot be null
    private String model;

    @Column(name = "Fuel_Type", nullable = false, length = 20) // Changed to Fuel_Type
    private String fuelType; // New field for fuel type (e.g., Petrol, Diesel, Electric)

    @Column(name = "Registration_Number", nullable = false, unique = true, length = 20) // Unique registration number
    private String registration;

    @ManyToOne
    @JoinColumn(name = "User_ID", nullable = false) // Mandatory relationship with User
    @JsonIgnore
    private User user;
    
    
    public Car(String company, String model, String fuelType, String registration, User user) {
        this.company = company;
        this.model = model;
        this.fuelType = fuelType;
        this.registration = registration;
        this.user = user;
    }
}
