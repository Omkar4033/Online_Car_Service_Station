package com.blogs.pojos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Entity
@Table(name = "Categories")
@Getter
@Setter
@ToString

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Category_ID")
    private Long categoryId; // Changed variable name for Java convention

    @Column(name = "Name", nullable = false) // Assuming name cannot be null
    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true) 
    @JsonIgnore            // Corrected "category"
    private List<Service> services;

    public void addService(Service service) {
        services.add(service);
        service.setCategory(this); // Maintain the bidirectional relationship
    }

    public void deleteService(Service service) {
        services.remove(service);
        service.setCategory(null); // Maintain the bidirectional relationship
    }
}
