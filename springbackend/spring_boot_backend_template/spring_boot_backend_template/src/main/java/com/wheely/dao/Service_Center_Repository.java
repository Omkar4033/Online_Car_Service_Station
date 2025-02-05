package com.blogs.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogs.pojos.Service_Center;

@Repository
public interface Service_Center_Repository extends JpaRepository<Service_Center, Long>{

}
