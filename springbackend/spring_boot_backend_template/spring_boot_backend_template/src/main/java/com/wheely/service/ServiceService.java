package com.wheely.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wheely.dao.CategoryRepository;
import com.wheely.dao.ServiceRepository;
import com.wheely.dto.ServiceDTO;
import com.wheely.pojos.Category;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    //To  Get all categories
    @Transactional
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    //To  Create a new service
    public com.wheely.pojos.Service createService(com.wheely.pojos.Service service) {
        return serviceRepository.save(service);
    }

    // To Get all active services
    @Transactional
    public List<com.wheely.pojos.Service> getAllServices() {
        return serviceRepository.findByIsActiveTrue(); 
    }

    // To all active services by category
    public List<com.wheely.pojos.Service> getServicesByCategory(Long categoryId) {
        return serviceRepository.findByCategory_CategoryIdAndIsActiveTrue(categoryId);
    }

    // To Get a single active service by ID
    public com.wheely.pojos.Service getServiceById(Long id) {
        Optional<com.wheely.pojos.Service> optionalService = serviceRepository.findById(id);
        return optionalService.filter(com.wheely.pojos.Service::isActive).orElse(null);
    }

    // Update an existing service
    public com.wheely.pojos.Service updateService(Long id, ServiceDTO serviceDto) {
        Optional<com.wheely.pojos.Service> optionalService = serviceRepository.findById(id);
        if (optionalService.isPresent()) {
            com.wheely.pojos.Service entity = optionalService.get();
            if (!entity.isActive()) {
                return null; 
            }
            entity.setName(serviceDto.getName());
            entity.setDescription(serviceDto.getDescription());
            entity.setPrice(serviceDto.getPrice());

            Optional<Category> category = categoryRepository.findById(serviceDto.getCategoryId());
            category.ifPresent(entity::setCategory);

            serviceRepository.save(entity);
            return entity;
        }
        return null;
    }

    // Soft delete a service
    public boolean softDeleteService(Long serviceId) {
        Optional<com.wheely.pojos.Service> optionalService = serviceRepository.findById(serviceId);
        if (optionalService.isPresent()) {
            com.wheely.pojos.Service service = optionalService.get();
            service.setActive(false); 
            serviceRepository.save(service);
            return true;
        }
        return false;
    }
}
