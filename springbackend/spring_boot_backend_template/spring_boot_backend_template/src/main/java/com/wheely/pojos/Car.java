package com.wheely.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"user", "bookings"}) // Exclude user & bookings to prevent infinite recursion
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Car_ID")
    private Long carId;

    @Column(name = "Company", nullable = false, length = 50)
    private String company;

    @Column(name = "Model", nullable = false, length = 50)
    private String model;

    @Column(name = "Fuel_Type", nullable = false, length = 20)
    private String fuelType;

    @Column(name = "Registration_Number", nullable = false, unique = true, length = 20)
    private String registration;

    @ManyToOne
    @JoinColumn(name = "User_ID", nullable = false)
    @JsonIgnore
    private User user;

    // ✅ Add One-to-Many relationship with Booking
    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Booking> bookings;

    public Car(String company, String model, String fuelType, String registration, User user) {
        this.company = company;
        this.model = model;
        this.fuelType = fuelType;
        this.registration = registration;
        this.user = user;
    }
}
