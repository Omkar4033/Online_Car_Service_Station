package com.wheely.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wheely.dao.BookingRepository;
import com.wheely.dao.CarRepository;
import com.wheely.dao.CategoryRepository;
import com.wheely.dao.ServiceRepository;
import com.wheely.dao.UserRepository;
import com.wheely.dto.ServiceDTO;
import com.wheely.pojos.Booking;
import com.wheely.pojos.Car;
import com.wheely.pojos.Category;
import com.wheely.pojos.User;
import com.wheely.pojos.UserRole;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private ServiceRepository serviceRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private CarRepository carRepository;

	// Get all users
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	// Get all bookings
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}

	// Get all services
	public List<com.wheely.pojos.Service> getAllServices() {
		return serviceRepository.findAll();
	}

	// Add service
	public com.wheely.pojos.Service addService(ServiceDTO serviceDto) {
		Category category = categoryRepository.findById(serviceDto.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));

		com.wheely.pojos.Service service = new com.wheely.pojos.Service(serviceDto.getName(), serviceDto.getDescription(),
				serviceDto.getPrice(), category);
		return serviceRepository.save(service);
	}

	// Fetch all cars if the user is an admin
	public List<Car> getAllCars(Long userId) {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

		if (user.getRole() == UserRole.ADMIN) {
			return carRepository.findAll();

		} else {
			throw new RuntimeException("Unauthorized: Only admin can access cars");
		}

	}
	
	
	
	
}
