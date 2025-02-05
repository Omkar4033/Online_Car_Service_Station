package com.blogs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blogs.dao.AddressRepository;
import com.blogs.dao.BookingRepository;
import com.blogs.dao.UserRepository;
import com.blogs.exception.ResourceNotFoundException;
import com.blogs.pojos.Address;
import com.blogs.pojos.Booking;
import com.blogs.pojos.User;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

  //  @Autowired
 //   private BookingRepository bookingRepository;

    
    public Address saveAddress(Long userId, Address address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));

        address.setUser(user);
        return addressRepository.save(address);
    }

 // Get all addresses by user ID
    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findByUser_UserId(userId);
    }

}
