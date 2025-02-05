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

  //  @Autowired
 //   private BookingRepository bookingRepository;

    
    public Address saveAddress(Long userId, Address address) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with ID " + userId + " not found"));

        Address managedAddress;
        
        if (address.getAddressId() != null) { // Check if address already exists
            managedAddress = addressRepository.findById(address.getAddressId())
                    .orElseThrow(() -> new ResourceNotFoundException("Address with ID " + address.getAddressId() + " not found"));
            
            // Update the existing address details
            managedAddress.setMobile(address.getMobile());
            managedAddress.setLandMark(address.getLandMark());
            managedAddress.setCity(address.getCity());
            managedAddress.setPinCode(address.getPinCode());
            managedAddress.setState(address.getState());
            managedAddress.setCountry(address.getCountry());
        } else {
            // New Address
            managedAddress = address;
        }

        managedAddress.setUser(user); // Ensure user is correctly associated
        return addressRepository.save(managedAddress);
    }

 // Get all addresses by user ID
    public List<Address> getAddressesByUserId(Long userId) {
        return addressRepository.findByUser_UserId(userId);
    }

}
