package com.wheely.service;

import java.util.Set;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wheely.dao.*;
import com.wheely.dto.*;
import com.wheely.exception.GlobalException;
import com.wheely.pojos.*;
import jakarta.transaction.Transactional;
import com.wheely.service.interfaces.BookingServiceInterface;

@Service
public class BookingService implements BookingServiceInterface {
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
	
	@Override
	public List<Booking> getBookingsByUser(Long userId) {
		return bookingRepository.findByUserUserIdOrderByBookingDateDesc(userId);
	}

	@Override
	public Booking getBookingById(Long bookingId) {
		return bookingRepository.findById(bookingId).orElse(null);
	}

	@Override
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

		User user = userRepository.findById(dto.getUserId()).orElseThrow(() -> new GlobalException("User not found"));
		Car car = carRepository.findById(dto.getCarId()).orElseThrow(() -> new GlobalException("Car not found"));
		Address address = addressRepository.findById(dto.getAddressId())
				.orElseThrow(() -> new GlobalException("Address not found"));

		User mechanic = null;
		if (dto.getMechanicId() != null) {
			mechanic = userRepository.findById(dto.getMechanicId())
					.orElseThrow(() -> new GlobalException("Mechanic not found"));

			if (!"MECHANIC".equals(mechanic.getRole())) {
				throw new GlobalException("Selected user is not a mechanic");
			}
		}

		Set<com.wheely.pojos.Service> selectedServices = new HashSet<>(
				serviceRepository.findAllById(dto.getServiceIds()));
		if (selectedServices.isEmpty()) {
			throw new GlobalException("No valid services found for provided IDs");
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

	@Override
	public List<Booking> getBookingsByStatus(String status) {
		return bookingRepository.findByBookingStatus(BookingStatus.valueOf(status.toUpperCase()));
	}

	@Override
	public List<Booking> getBookingsByMechanic(Long mechanicId) {
		return bookingRepository.findByMechanicUserId(mechanicId);
	}
	
	@Override
	public List<Booking> getBookingsByMechanicAndStatus(Long mechanicId, String status) {
		try {
			BookingStatus bookingStatus = BookingStatus.valueOf(status); // Convert string to enum
			return bookingRepository.findByMechanicUserIdAndBookingStatus(mechanicId, bookingStatus);
		} catch (IllegalArgumentException e) {
			throw new IllegalArgumentException("Invalid booking status: " + status);
		}
	}
	
	@Override
	public Booking updateJobStatus(Long bookingId, BookingStatusUpdateDTO statusUpdate) {
		if (statusUpdate.getMechanicId() == null || statusUpdate.getStatus() == null || statusUpdate.getStatus().isEmpty()) {
			throw new IllegalArgumentException("Mechanic ID and status are required");
		}

		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new IllegalArgumentException("Booking not found"));
		User mechanic = userRepository.findById(statusUpdate.getMechanicId())
				.orElseThrow(() -> new IllegalArgumentException("Mechanic not found"));

		if (booking.getMechanic() == null) {
			booking.setMechanic(mechanic);
		} else if (!booking.getMechanic().getUserId().equals(statusUpdate.getMechanicId())) {
			throw new IllegalStateException("Mechanic not authorized to update this booking");
		}

		BookingStatus newStatus = BookingStatus.valueOf(statusUpdate.getStatus().toUpperCase());
		booking.setBookingStatus(newStatus);
		return bookingRepository.save(booking);
	}

	@Override
	public Booking completeJob(Long bookingId, BookingStatusUpdateDTO statusUpdate) {
		if (statusUpdate.getMechanicId() == null || statusUpdate.getCustomerPhoneNo() == null) {
			throw new IllegalArgumentException("Valid mechanic ID and customer phone number are required to complete the job.");
		}

		Booking booking = bookingRepository.findById(bookingId)
				.orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

		if (booking.getMechanic() == null || !booking.getMechanic().getUserId().equals(statusUpdate.getMechanicId())) {
			throw new IllegalStateException("Mechanic not authorized to complete this booking.");
		}

		String actualPhoneNo = booking.getUser().getPhoneNo(); // Assuming `getPhoneNo()` exists in User entity
		if (!actualPhoneNo.equals(statusUpdate.getCustomerPhoneNo())) {
			throw new IllegalArgumentException("Provided phone number does not match the customer's registered phone number.");
		}

		booking.setBookingStatus(BookingStatus.COMPLETED);
		return bookingRepository.save(booking);
	}
}
