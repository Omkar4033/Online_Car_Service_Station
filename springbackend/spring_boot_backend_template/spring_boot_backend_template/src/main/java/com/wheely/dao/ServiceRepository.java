package com.wheely.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wheely.pojos.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long>{

	List<Service> findByCategory_CategoryId(Long categoryId);


}
