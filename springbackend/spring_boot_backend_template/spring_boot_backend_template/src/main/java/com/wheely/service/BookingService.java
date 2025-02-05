package com.wheely.service;

import java.util.Set;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wheely.dao.*;
import com.wheely.dto.*;
import com.wheely.pojos.*;
import jakarta.transaction.Transactional;

@Service
public class BookingService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private BookingRepository bookingRepository;
    
    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserUserId(userId);
    }

    
    public Booking getBookingById(Long bookingId) {
        return bookingRepository.findById(bookingId).orElse(null);
    }

    @Transactional
    public Booking createBooking(BookingRequestDTO dto) {
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("User ID must not be null");
        }
        if (dto.getCarId() == null) {
            throw new IllegalArgumentException("Car ID must not be null");
        }
        if (dto.getAddressId() == null) {
            throw new IllegalArgumentException("Address ID must not be null");
        }

        User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Car car = carRepository.findById(dto.getCarId()).orElseThrow(() -> new RuntimeException("Car not found"));
        Address address = addressRepository.findById(dto.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        User mechanic = null;
        if (dto.getMechanicId() != null) {
            mechanic = userRepository.findById(dto.getMechanicId())
                    .orElseThrow(() -> new RuntimeException("Mechanic not found"));

            if (!"MECHANIC".equals(mechanic.getRole())) {
                throw new RuntimeException("Selected user is not a mechanic");
            }
        }

        Set<com.wheely.pojos.Service> selectedServices = new HashSet<>(
                serviceRepository.findAllById(dto.getServiceIds()));
        if (selectedServices.isEmpty()) {
            throw new RuntimeException("No valid services found for provided IDs");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setCar(car);
        booking.setAddress(address);
        if (mechanic != null) {
            booking.setMechanic(mechanic);
        }
        booking.setServices(selectedServices);
        booking.setTotalAmount(dto.getTotalAmount());

        return bookingRepository.save(booking);
    }


	
}
