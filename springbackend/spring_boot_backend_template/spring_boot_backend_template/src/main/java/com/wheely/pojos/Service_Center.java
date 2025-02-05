package com.blogs.pojos;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Services_Centers")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Service_Center {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Center_ID")
    private Long centerId; // Renamed to camelCase for Java convention

    @Column(name = "Name", nullable = false) // Assuming name is mandatory
    private String name;

    @Column(name = "Location", nullable = false) // Assuming location is mandatory
    private String location;

    @Column(name = "Contact", nullable = false) // Assuming contact is mandatory
    private String contact;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings;

    // Helper methods to manage bidirectional relationships
    public void addBooking(Booking booking) {
        bookings.add(booking);
        booking.setCenter(this); // Maintain bidirectional relationship
    }

    public void removeBooking(Booking booking) {
        bookings.remove(booking);
        booking.setCenter(null); // Maintain bidirectional relationship
    }
}
