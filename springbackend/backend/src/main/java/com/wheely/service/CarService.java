package com.wheely.service;

import com.wheely.dao.CarRepository;
import com.wheely.dao.UserRepository;
import com.wheely.dto.CarDTO;
import com.wheely.pojos.Car;
import com.wheely.pojos.User;
import com.wheely.exception.GolbalException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Add car
    public Car addCar(CarDTO carDto) {
        User user = userRepository.findById(carDto.getUserId())
            .orElseThrow(() -> new GolbalException("User not found"));

        Car car = new Car(carDto.getCompany(), carDto.getModel(), carDto.getFuelType(), carDto.getRegistration(), user);
        return carRepository.save(car);
    }

    // Get all cars
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Get car by ID
    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }
    
    //Get Car by user id
    public List<Car> getCarsByUserId(Long userId) {
        // Assuming you have a method in your CarRepository to get cars by userId
        return carRepository.findByUser_UserId(userId);
    }

    // Update car
    public Car updateCar(Long id, CarDTO carDto) {
        Car existingCar = carRepository.findById(id)
            .orElseThrow(() -> new GolbalException("Car not found"));

        existingCar.setCompany(carDto.getCompany());
        existingCar.setModel(carDto.getModel());
        existingCar.setFuelType(carDto.getFuelType());
        existingCar.setRegistration(carDto.getRegistration());

        return carRepository.save(existingCar);
    }

    // Delete car
    public void deleteCar(Long id) {
        Car car = carRepository.findById(id)
            .orElseThrow(() -> new GolbalException("Car not found"));
        carRepository.delete(car);
    }
}
