package com.wheely.service.interfaces;

import com.wheely.dto.ServiceDTO;
import com.wheely.pojos.Category;
import com.wheely.pojos.Service;

import java.util.List;

public interface ServiceServiceInterface {
    List<Category> getAllCategories();
    Service createService(Service service);
    List<Service> getAllServices();
    List<Service> getServicesByCategory(Long categoryId);
    Service getServiceById(Long id);
    Service updateService(Long id, ServiceDTO serviceDto);
    boolean softDeleteService(Long serviceId);
}
