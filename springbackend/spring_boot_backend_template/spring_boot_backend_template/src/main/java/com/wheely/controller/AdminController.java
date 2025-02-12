package com.wheely.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wheely.dto.ServiceDTO;
import com.wheely.pojos.Booking;
import com.wheely.pojos.Car;
import com.wheely.pojos.Service;
import com.wheely.pojos.User;
import com.wheely.service.AdminService;
import com.wheely.service.ServiceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	@Autowired
	private ServiceService serviceService;

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
	
	// Update an existing service
	@PutMapping("/services/update/{serviceId}")
	public ResponseEntity<Service> updateService(@PathVariable Long serviceId, @RequestBody ServiceDTO serviceDto) {
	    Optional<Service> existingService = Optional.ofNullable(serviceService.getServiceById(serviceId));
	    
	    if (existingService.isPresent()) {
	        Service updatedService = serviceService.updateService(serviceId, serviceDto);
	        return ResponseEntity.ok(updatedService);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 if service not found
	    }
	}

	// Soft delete a service (mark as inactive)
	@DeleteMapping("/services/delete/{serviceId}")
	public ResponseEntity<String> softDeleteService(@PathVariable Long serviceId) {
	    boolean isDeleted = serviceService.softDeleteService(serviceId);
	    
	    if (isDeleted) {
	        return ResponseEntity.ok("Service has been marked as inactive.");
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Service not found.");
	    }
	}

	
	

}
