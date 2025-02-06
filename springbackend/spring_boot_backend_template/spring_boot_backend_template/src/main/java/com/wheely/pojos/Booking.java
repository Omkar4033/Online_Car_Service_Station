package com.wheely.pojos;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

@Entity
@Table(name = "Bookings")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = {"services", "mechanic"}) // Prevent infinite recursion
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Booking_ID")
    private Long bookingId;

    @Column(name = "Booking_Date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date bookingDate = new Date(); // Default to current date and time

    @Enumerated(EnumType.STRING)
    @Column(name = "Booking_Status", columnDefinition = "VARCHAR(255) DEFAULT 'PENDING'")
    private BookingStatus bookingStatus = BookingStatus.PENDING;

    @Column(name = "Total_Amount")
    private Double totalAmount; // Removed nullable constraint

    @ManyToOne
    @JoinColumn(name = "User_ID", referencedColumnName = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToMany
    @JoinTable(
        name = "booking_services", 
        joinColumns = @JoinColumn(name = "booking_id"), 
        inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    @JsonIgnore
    private Set<Service> services = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "Address_ID", referencedColumnName = "address_id", nullable = false)
    private Address address;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "Mechanic_ID", referencedColumnName = "user_id")
    
    private User mechanic;

    // Constructor
    public Booking(User user, Set<Service> services, Address address, User mechanic, BookingStatus bookingStatus, Double totalAmount) {
        this.user = user;
        this.services = services;
        this.address = address;
        this.mechanic = mechanic;
        this.bookingStatus = bookingStatus;
        this.totalAmount = totalAmount;
    }
}
