package com.wheely.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    @Column(name = "mobile", nullable = false, length = 15)
    private String mobile;

    @Column(name = "landmark", nullable = false, length = 255)
    private String landMark;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pinCode;

    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @Column(name = "country", nullable = false, length = 100)
    private String country;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false) // Multiple addresses can belong to one user
    private User user;

    // One address can have multiple bookings (using List)
    @OneToMany(mappedBy = "address")
    @JsonIgnore
    @OrderBy("bookingDate ASC") // Optional: to order bookings by booking date
    private List<Booking> bookings = new ArrayList<>(); // Initialize with an empty list
}
