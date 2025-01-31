package com.blogs.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogs.pojos.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{

}
