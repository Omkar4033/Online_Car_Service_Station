package com.blogs.service;

import com.blogs.dao.CategoryRepository;
import com.blogs.dto.CategoryDTO;
import com.blogs.pojos.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // Get a category by ID
    public CategoryDTO getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return category != null ? CategoryDTO.fromEntity(category) : null;
    }

    // Create a new category
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category = categoryRepository.save(category);
        return CategoryDTO.fromEntity(category);
    }

    // Update an existing category
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category == null) {
            return null;
        }
        category.setName(categoryDTO.getName());
        category = categoryRepository.save(category);
        return CategoryDTO.fromEntity(category);
    }

    // Delete a category
    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
