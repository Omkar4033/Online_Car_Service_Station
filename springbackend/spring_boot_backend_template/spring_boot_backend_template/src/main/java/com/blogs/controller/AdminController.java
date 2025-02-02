package com.blogs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.blogs.pojos.User;
import com.blogs.dto.ServiceDTO;
import com.blogs.pojos.Booking;
import com.blogs.pojos.Car;
import com.blogs.pojos.Service;
import com.blogs.service.AdminService; // Create an AdminService for handling business logic

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

	@Autowired
	private AdminService adminService;

	// Get all users
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		List<User> users = adminService.getAllUsers();
		if (users != null && !users.isEmpty()) {
			return new ResponseEntity<>(users, HttpStatus.OK); // 200 OK
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content if no users found
		}
	}

	// Get all bookings
	@GetMapping("/bookings")
	public ResponseEntity<List<Booking>> getAllBookings() {
		List<Booking> bookings = adminService.getAllBookings();
		if (bookings != null && !bookings.isEmpty()) {
			return new ResponseEntity<>(bookings, HttpStatus.OK); // 200 OK
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content if no bookings found
		}
	}

	// Get all services
	@GetMapping("/services")
	public ResponseEntity<List<Service>> getAllServices() {
		List<Service> services = adminService.getAllServices();
		if (services != null && !services.isEmpty()) {
			return new ResponseEntity<>(services, HttpStatus.OK); // 200 OK
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content if no services found
		}
	}

	// Get all cars (only if user is admin)
	@GetMapping("/cars/{userId}")
	public ResponseEntity<?> getAllCars(@PathVariable Long userId) {
	    try {
	        List<Car> cars = adminService.getAllCars(userId);
	        return ResponseEntity.ok(cars);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
	    }
	}

	@PostMapping("/services/add")
	public ResponseEntity<Service> addService(@RequestBody ServiceDTO serviceDto) {
		Service savedService = adminService.addService(serviceDto);
		if (savedService != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(savedService);
		else
			return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);
	}

}
