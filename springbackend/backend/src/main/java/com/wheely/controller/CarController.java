package com.wheely.controller;

import com.wheely.dto.CarDTO;
import com.wheely.pojos.Car;
import com.wheely.service.CarService;
import com.wheely.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private UserService userService;

    // Add a new car
    @PostMapping("/add")
    public ResponseEntity<?> addCar(@RequestBody CarDTO carDto) {
        try {
            Car car = carService.addCar(carDto);
            return ResponseEntity.ok(car);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while adding the car.");
        }
    }

    // Get all cars for a specific user by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCarsByUserId(@PathVariable Long userId) {
        try {
            // Fetch all cars for the user
            List<Car> cars = carService.getCarsByUserId(userId);
            
            // Check if the user has cars
            if (cars.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No cars found for this user.");
            }
            
            return ResponseEntity.ok(cars);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving cars for the user.");
        }
    }
    
    // Get car by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getCarById(@PathVariable Long id) {
        try {
            Car car = carService.getCarById(id)
                    .orElseThrow(() -> new RuntimeException("Car not found"));
            return ResponseEntity.ok(car);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while retrieving the car.");
        }
    }

    // Update a car
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCar(@PathVariable Long id, @RequestBody CarDTO carDto) {
        try {
            Car updatedCar = carService.updateCar(id, carDto);
            return ResponseEntity.ok(updatedCar);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the car.");
        }
    }

    // Delete a car
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        try {
            carService.deleteCar(id);
            return ResponseEntity.ok("Car deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the car.");
        }
    }
}
