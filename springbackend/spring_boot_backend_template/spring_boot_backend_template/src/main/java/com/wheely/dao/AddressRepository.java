package com.blogs.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogs.pojos.Address;



@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

	List<Address> findByUser_UserId(Long userId);
//    List<ContactInfo> findByUserId(Long userId);
}