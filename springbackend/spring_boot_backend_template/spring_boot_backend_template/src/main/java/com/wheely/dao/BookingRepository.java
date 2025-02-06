package com.wheely.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wheely.pojos.Booking;
import com.wheely.pojos.BookingStatus;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{

	List<Booking> findByUserUserIdOrderByBookingDateDesc(Long userId);
	
	

	List<Booking> findByBookingStatus(BookingStatus status);



	List<Booking> findByMechanicUserId(Long mechanicId);



	List<Booking> findByMechanicUserIdAndBookingStatus(Long mechanicId, BookingStatus bookingStatus);

}
