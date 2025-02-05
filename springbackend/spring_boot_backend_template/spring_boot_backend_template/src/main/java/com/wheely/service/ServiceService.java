package com.wheely.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wheely.dao.CategoryRepository;
import com.wheely.dao.ServiceRepository;
import com.wheely.pojos.Category;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    @Transactional
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    

    // Create a new service
    public com.wheely.pojos.Service createService(com.wheely.pojos.Service service) {
        return serviceRepository.save(service);
    }

    // Get all services (optionally filtered by category)
    public List<com.wheely.pojos.Service> getAllServices() {
        return serviceRepository.findAll();
    }

    // Get all services by category
    public List<com.wheely.pojos.Service> getServicesByCategory(Long categoryId) {
        return serviceRepository.findByCategory_CategoryId(categoryId);
    }

    // Get a single service by ID
    public com.wheely.pojos.Service getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    // Update an existing service
    public com.wheely.pojos.Service updateService(Long id, com.wheely.pojos.Service service) {
        Optional<com.wheely.pojos.Service> optionalService = serviceRepository.findById(id);
        if (optionalService.isPresent()) {
            com.wheely.pojos.Service entity = optionalService.get();
            entity.setName(service.getName());
            entity.setDescription(service.getDescription());
            entity.setPrice(service.getPrice());
            entity.setCategory(service.getCategory());
            serviceRepository.save(entity);
            return entity;
        }
        return null ;
    }

    // Delete a service
    public boolean deleteService(Long id) {
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
