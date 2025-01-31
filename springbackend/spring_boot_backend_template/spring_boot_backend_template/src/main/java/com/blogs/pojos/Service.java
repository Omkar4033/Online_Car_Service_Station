package com.blogs.pojos;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Services")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "bookings") // Prevent infinite recursion
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Service_ID")
    private Long serviceId; // Renamed to follow camelCase

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "Price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "Category_ID", nullable = false)
    private Category category;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Booking> bookings = new ArrayList<>(); // Initialize to avoid NullPointerException

    // Helper methods to manage bidirectional relationships
    public void addBooking(Booking booking) {
        bookings.add(booking);
        booking.setService(this); // Maintain bidirectional relationship
    }

    public void removeBooking(Booking booking) {
        bookings.remove(booking);
        booking.setService(null); // Maintain bidirectional relationship
    }
    
    public Service(String name, String description, double price, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}
