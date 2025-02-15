package com.wheely.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wheely.dao.CategoryRepository;
import com.wheely.dao.ServiceRepository;
import com.wheely.dto.ServiceDTO;
import com.wheely.pojos.Category;
import com.wheely.pojos.Service;
import com.wheely.service.interfaces.ServiceServiceInterface;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService implements ServiceServiceInterface {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    @Transactional
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    @Override
    @Transactional
    public List<Service> getAllServices() {
        return serviceRepository.findByIsActiveTrue();
    }

    @Override
    public List<Service> getServicesByCategory(Long categoryId) {
        return serviceRepository.findByCategory_CategoryIdAndIsActiveTrue(categoryId);
    }

    @Override
    public Service getServiceById(Long id) {
        Optional<Service> optionalService = serviceRepository.findById(id);
        return optionalService.filter(Service::isActive).orElse(null);
    }

    @Override
    public Service updateService(Long id, ServiceDTO serviceDto) {
        Optional<Service> optionalService = serviceRepository.findById(id);
        if (optionalService.isPresent()) {
            Service entity = optionalService.get();
            if (!entity.isActive()) {
                return null;
            }
            entity.setName(serviceDto.getName());
            entity.setDescription(serviceDto.getDescription());
            entity.setPrice(serviceDto.getPrice());

            Optional<Category> category = categoryRepository.findById(serviceDto.getCategoryId());
            category.ifPresent(entity::setCategory);

            return serviceRepository.save(entity);
        }
        return null;
    }

    @Override
    public boolean softDeleteService(Long serviceId) {
        Optional<Service> optionalService = serviceRepository.findById(serviceId);
        if (optionalService.isPresent()) {
            Service service = optionalService.get();
            service.setActive(false);
            serviceRepository.save(service);
            return true;
        }
        return false;
    }
}
