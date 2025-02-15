package com.wheely.service.impl;

import com.wheely.dto.ServiceDTO;
import com.wheely.pojos.Booking;
import com.wheely.pojos.Car;
import com.wheely.pojos.Category;
import com.wheely.pojos.User;
import com.wheely.pojos.UserRole;
import com.wheely.pojos.Service;
import com.wheely.dao.BookingRepository;
import com.wheely.dao.CarRepository;
import com.wheely.dao.CategoryRepository;
import com.wheely.dao.ServiceRepository;
import com.wheely.dao.UserRepository;
import com.wheely.exception.GlobalException;
import com.wheely.service.interfaces.AdminServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminService implements AdminServiceInterface {

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

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public Service addService(ServiceDTO serviceDto) {
        Category category = categoryRepository.findById(serviceDto.getCategoryId())
                .orElseThrow(() -> new GlobalException("Category not found"));

        Service service = new Service(
                serviceDto.getName(),
                serviceDto.getDescription(),
                serviceDto.getPrice(),
                category
        );
        return serviceRepository.save(service);
    }

    @Override
    public List<Car> getAllCars(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == UserRole.ADMIN) {
            return carRepository.findAll();
        } else {
            throw new RuntimeException("Unauthorized: Only admin can access cars");
        }
    }
}
