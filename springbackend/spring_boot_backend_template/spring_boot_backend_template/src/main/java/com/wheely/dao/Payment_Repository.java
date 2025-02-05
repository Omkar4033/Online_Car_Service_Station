package com.blogs.dao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogs.pojos.Payment;

@Repository
public interface Payment_Repository extends JpaRepository<Payment, Long>{

}
