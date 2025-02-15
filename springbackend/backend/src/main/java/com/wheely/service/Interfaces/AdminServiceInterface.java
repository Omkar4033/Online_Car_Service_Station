package com.wheely.service.interfaces;

import com.wheely.dto.ServiceDTO;
import com.wheely.pojos.Booking;
import com.wheely.pojos.Car;
import com.wheely.pojos.User;
import com.wheely.pojos.Service;
import java.util.List;

public interface AdminServiceInterface {
    List<User> getAllUsers();
    List<Booking> getAllBookings();
    List<Service> getAllServices();
    Service addService(ServiceDTO serviceDto);
    List<Car> getAllCars(Long userId);
}
