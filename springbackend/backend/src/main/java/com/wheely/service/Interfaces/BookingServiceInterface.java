package com.wheely.service.interfaces;

import com.wheely.dto.BookingRequestDTO;
import com.wheely.dto.BookingStatusUpdateDTO;
import com.wheely.pojos.Booking;
import java.util.List;

public interface BookingServiceInterface {
    List<Booking> getBookingsByUser(Long userId);
    Booking getBookingById(Long bookingId);
    Booking createBooking(BookingRequestDTO dto);
    List<Booking> getBookingsByStatus(String status);
    List<Booking> getBookingsByMechanic(Long mechanicId);
    List<Booking> getBookingsByMechanicAndStatus(Long mechanicId, String status);
    Booking updateJobStatus(Long bookingId, BookingStatusUpdateDTO statusUpdate);
    Booking completeJob(Long bookingId, BookingStatusUpdateDTO statusUpdate);
}
