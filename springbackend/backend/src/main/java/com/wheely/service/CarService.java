package com.wheely.service;

import com.wheely.dao.CarRepository;
import com.wheely.dao.UserRepository;
import com.wheely.dto.CarDTO;
import com.wheely.pojos.Car;
import com.wheely.pojos.User;
import com.wheely.exception.GlobalException;
import com.wheely.service.interfaces.CarServiceInterface;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService implements CarServiceInterface {

    @Autowired
    private CarRepository carRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public Car addCar(CarDTO carDto) {
        User user = userRepository.findById(carDto.getUserId())
            .orElseThrow(() -> new GlobalException("User not found"));

        Car car = new Car(carDto.getCompany(), carDto.getModel(), carDto.getFuelType(), carDto.getRegistration(), user);
        return carRepository.save(car);
    }

    @Override
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @Override
    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }
    
    @Override
    public List<Car> getCarsByUserId(Long userId) {
        return carRepository.findByUser_UserId(userId);
    }

    @Override
    public Car updateCar(Long id, CarDTO carDto) {
        Car existingCar = carRepository.findById(id)
            .orElseThrow(() -> new GlobalException("Car not found"));

        existingCar.setCompany(carDto.getCompany());
        existingCar.setModel(carDto.getModel());
        existingCar.setFuelType(carDto.getFuelType());
        existingCar.setRegistration(carDto.getRegistration());

        return carRepository.save(existingCar);
    }

    @Override
    public void deleteCar(Long id) {
        Car car = carRepository.findById(id)
            .orElseThrow(() -> new GlobalException("Car not found"));
        carRepository.delete(car);
    }
}
