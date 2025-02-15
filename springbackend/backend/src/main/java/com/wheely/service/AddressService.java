package com.wheely.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wheely.dao.AddressRepository;
import com.wheely.dao.BookingRepository;
import com.wheely.dao.UserRepository;
import com.wheely.exception.ResourceNotFoundException;
import com.wheely.pojos.Address;
import com.wheely.pojos.Booking;
import com.wheely.pojos.User;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

  

    public Address saveAddress(Long userId, Address address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));

        address.setUser(user);


        return addressRepository.save(address);
    }



 //  ToGet all addresses by user id 
    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findByUser_UserId(userId);
    }

}
