package com.wheely.controller;

import com.wheely.pojos.Service;
import com.wheely.service.ServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    // Get all services
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        try {
            List<Service> services = serviceService.getAllServices();
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Get all services by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Service>> getServicesByCategory(@PathVariable Long categoryId) {
        try {
            List<Service> services = serviceService.getServicesByCategory(categoryId);
            return ResponseEntity.ok(services);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Get a single service by ID
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        try {
            Service service = serviceService.getServiceById(id);
            if (service == null) {
                return ResponseEntity.status(404).body(null);
            }
            return ResponseEntity.ok(service);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Create a new service
    @PostMapping
    public ResponseEntity<Service> createService(@RequestBody Service service) {
        try {
            Service createdService = serviceService.createService(service);
            return ResponseEntity.ok(createdService);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    
}
