package com.wheely.service.interfaces;

import com.wheely.pojos.Address;
import java.util.List;

public interface AddressServiceInterface {
    Address saveAddress(Long userId, Address address);
    List<Address> getAddressesByUserId(Long userId);
}
