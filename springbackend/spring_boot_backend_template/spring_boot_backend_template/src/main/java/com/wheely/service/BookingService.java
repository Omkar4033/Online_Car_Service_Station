package com.wheely.service;

import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

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
		return bookingRepository.findByUserUserIdOrderByBookingDateDesc(userId);
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

	public List<Booking> getBookingsByStatus(String status) {
		return bookingRepository.findByBookingStatus(BookingStatus.valueOf(status.toUpperCase()));
	}

	

    public List<Booking> getBookingsByMechanic(Long mechanicId) {
        return bookingRepository.findByMechanicUserId(mechanicId);
    }
    
    
    public Booking updateJobStatus(Long bookingId, Long mechanicId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        User mechanic = userRepository.findById(mechanicId)
                .orElseThrow(() -> new IllegalArgumentException("Mechanic not found"));

        if (booking.getMechanic() == null) {
            booking.setMechanic(mechanic);
        } else if (!booking.getMechanic().getUserId().equals(mechanicId)) {
            throw new IllegalStateException("Mechanic not authorized to update this booking");
        }

        try {
            BookingStatus newStatus = BookingStatus.valueOf(status.toUpperCase());
            booking.setBookingStatus(newStatus);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid booking status: " + status);
        }

        return bookingRepository.save(booking);
    }
    
    public List<Booking> getBookingsByMechanicAndStatus(Long mechanicId, String status) {
        try {
            BookingStatus bookingStatus = BookingStatus.valueOf(status); // Convert string to enum
            return bookingRepository.findByMechanicUserIdAndBookingStatus(mechanicId, bookingStatus);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid booking status: " + status);
        }
    }

	
}
