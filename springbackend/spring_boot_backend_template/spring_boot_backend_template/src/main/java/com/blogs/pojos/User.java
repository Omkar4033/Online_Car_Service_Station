package com.blogs.pojos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString(exclude = "password")
@NoArgsConstructor
@Entity
@Table(name = "Users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "User_ID")
	private Long userId;

	@Column(name = "Name", nullable = false, length = 100) // Name cannot be null and has a length constraint
	private String name;

	@Column(name = "Email", nullable = false, length = 100) // Email must be unique
	private String email;

	@Column(name = "Phone", nullable = true, length = 15) // Phone number must be unique
	private String phoneNo; // Renamed to follow camelCase

	@Column(name = "Address", length = 255) // Optional field
	private String address;

	@Column(name = "Password", nullable = false, length = 60) // Length assumes hashed passwords
	@JsonIgnore
	private String password;
	@Enumerated(EnumType.STRING)
	@Column(name = "Role", nullable = false, length = 50) // Role must not be null
	private UserRole role;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Car> vehicles;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Booking> bookings;

}
