package com.wheely.dto;

import com.wheely.pojos.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long categoryId;
    private String name;

    // Static method to convert from Category entity to DTO
    public static CategoryDTO fromEntity(Category category) {
        return new CategoryDTO(
                category.getCategoryId(),
                category.getName()
        );
    }

	
}
