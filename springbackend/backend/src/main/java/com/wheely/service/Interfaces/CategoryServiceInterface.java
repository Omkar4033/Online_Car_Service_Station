package com.wheely.service.interfaces;

import com.wheely.dto.CategoryDTO;
import java.util.List;

public interface CategoryServiceInterface {
    List<CategoryDTO> getAllCategories();
    CategoryDTO getCategoryById(Long id);
    CategoryDTO createCategory(CategoryDTO categoryDTO);
    CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO);
    boolean deleteCategory(Long id);
}
