package com.blogs.pojos;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
//import lombok.Getter;
import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Getter
//@Setter
@NoArgsConstructor
@Entity
@Table(name = "Bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingId")
    private Long bookingId;

    @Column(name = "BookingDate")
    private LocalDate bookingDate;

    @Column(name = "Status", nullable = false)  // Assuming status cannot be null
    private String status;
    
    @ManyToOne(cascade = CascadeType.MERGE)  // Consider more specific cascade types
    @JoinColumn(name = "ServiceId", nullable = false)
    private Service service;
    
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "UserId", nullable = false)
    private User user;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "CenterId", nullable = false)
    private Service_Center center;

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Service_Center getCenter() {
		return center;
	}

	public void setCenter(Service_Center center) {
		this.center = center;
	}
    
}
