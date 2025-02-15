package com.wheely.controller;

import com.wheely.dto.BookingRequestDTO;
import com.wheely.dto.BookingStatusUpdateDTO;
import com.wheely.pojos.Booking;
import com.wheely.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Collections;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin() 
public class BookingController {

    @Autowired
    private BookingService bookingService;
    
    
    //create  a booking
    @PostMapping("/save")
    public ResponseEntity<?> saveBooking(@RequestBody BookingRequestDTO bookingRequest) {
        try {
            Booking booking = bookingService.createBooking(bookingRequest);
            return ResponseEntity.ok(Collections.singletonMap("message", "Booking saved successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    //  Get all bookings for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBookingsByUser(@PathVariable Long userId) {
        try {
            List<Booking> bookings = bookingService.getBookingsByUser(userId);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
    
    //  Get booking details by bookingId
    @GetMapping("/{bookingId}")
    public ResponseEntity<?> getBookingById(@PathVariable Long bookingId) {
        try {
            Booking booking = bookingService.getBookingById(bookingId);
            if (booking == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("error", "Booking not found"));
            }
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    //  Get all bookings with pending status
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingBookings() {
        try {
            List<Booking> pendingBookings = bookingService.getBookingsByStatus("pending");
            return ResponseEntity.ok(pendingBookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
    
    
    // Get all the bookings for the specific mechanic
    @GetMapping("/mechanic/{mechanicId}")
    public ResponseEntity<?> getBookingsByMechanic(
            @PathVariable Long mechanicId,
            @RequestParam(required = false) String status) {
        try {
            List<Booking> bookings;
            if (status != null) {
                bookings = bookingService.getBookingsByMechanicAndStatus(mechanicId, status.toUpperCase());
            } else {
                bookings = bookingService.getBookingsByMechanic(mechanicId);
            }
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
    
    // Update job status using PATCH
    @PatchMapping("/{bookingId}")
    public ResponseEntity<?> updateJobStatus(@PathVariable Long bookingId, @RequestBody BookingStatusUpdateDTO statusUpdate) {
        try {
            Booking updatedBooking = bookingService.updateJobStatus(bookingId, statusUpdate);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }
    
    //Separate route for marking job as COMPLETED (Requires customerPhoneNo)
    @PatchMapping("/{bookingId}/complete")
    public ResponseEntity<?> completeJob(@PathVariable Long bookingId, @RequestBody BookingStatusUpdateDTO statusUpdate) {
        try {
            Booking completedBooking = bookingService.completeJob(bookingId, statusUpdate);
            return ResponseEntity.ok(completedBooking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }
    
}

