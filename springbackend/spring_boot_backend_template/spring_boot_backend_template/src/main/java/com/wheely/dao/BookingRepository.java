package com.wheely.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wheely.pojos.Booking;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{

	List<Booking> findByUserUserId(Long userId);

}
