package com.wheely.pojos;

import java.util.HashSet;
import java.util.Set;

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
    private Long serviceId;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "Price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "Category_ID", nullable = false)
    private Category category;

    @ManyToMany(mappedBy = "services")
    @JsonIgnore
    private Set<Booking> bookings = new HashSet<>(); // Set to avoid duplicate entries

    

    public Service(String name, String description, Double price, Category category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}
