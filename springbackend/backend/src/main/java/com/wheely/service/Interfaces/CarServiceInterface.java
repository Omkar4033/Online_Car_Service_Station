package com.wheely.service.interfaces;

import com.wheely.dto.CarDTO;
import com.wheely.pojos.Car;
import java.util.List;
import java.util.Optional;

public interface CarServiceInterface {
    Car addCar(CarDTO carDto);
    List<Car> getAllCars();
    Optional<Car> getCarById(Long id);
    List<Car> getCarsByUserId(Long userId);
    Car updateCar(Long id, CarDTO carDto);
    void deleteCar(Long id);
}
