package com.blogs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.blogs.pojos.User;
import com.blogs.pojos.Booking;
import com.blogs.pojos.Category;
import com.blogs.dao.UserRepository;
import com.blogs.dto.ServiceDTO;
import com.blogs.dao.BookingRepository;
import com.blogs.dao.CategoryRepository;
import com.blogs.dao.ServiceRepository;

import java.util.List;

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

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get all bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get all services
    public List<com.blogs.pojos.Service> getAllServices() {
        return serviceRepository.findAll();
    }
    
    
    // Add service
    public com.blogs.pojos.Service addService(ServiceDTO serviceDto) {
        Category category = categoryRepository.findById(serviceDto.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found"));

        com.blogs.pojos.Service service = new com.blogs.pojos.Service(serviceDto.getName(), serviceDto.getDescription(), serviceDto.getPrice(), category);
        return serviceRepository.save(service);
    }
}
