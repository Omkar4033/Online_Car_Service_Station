package com.blogs.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @JoinColumn(name = "userId", nullable = false) // Multiple contact info records can belong to one user
    private User user;
}