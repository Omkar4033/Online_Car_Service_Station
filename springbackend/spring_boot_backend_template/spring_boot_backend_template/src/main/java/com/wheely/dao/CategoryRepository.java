package com.blogs.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blogs.pojos.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

}
