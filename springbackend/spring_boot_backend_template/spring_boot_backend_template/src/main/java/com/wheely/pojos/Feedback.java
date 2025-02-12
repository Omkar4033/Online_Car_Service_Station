package com.wheely.pojos;



import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "feedbacks")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false, unique = true) // Ensures one feedback per booking
    private Booking booking;

    @Column(nullable = false, length = 500)
    private String feedback;

    @Column(nullable = false)
    private int rating;
}
