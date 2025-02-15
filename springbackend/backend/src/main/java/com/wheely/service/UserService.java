package com.wheely.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wheely.dao.UserRepository;
import com.wheely.dto.UserUpdateDTO;
import com.wheely.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Authenticate user with email and password
    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        } else {
            return null;
        }
    }

    // Register a new user
    public User registerUser(User newUser) {
        User addedUser = userRepository.save(newUser);
        if (addedUser != null) {
            return newUser;
        } else {
            return null;
        }
    }

    // Remove a user by ID
    public String removeUser(Long id) {
        User userToDelete = userRepository.findById(id).orElseThrow();
        if (userToDelete != null) {
            userRepository.delete(userToDelete);
            return "User with ID " + id + " deleted";
        } else {
            return "User not found!";
        }
    }

    // Update user details by ID
    public String updateUserDetails(UserUpdateDTO userUpdateDTO, Long id) {
        User userToUpdate = userRepository.findById(id).orElseThrow();
        if (userToUpdate != null) {
            userToUpdate.setName(userUpdateDTO.getName());
            userToUpdate.setEmail(userUpdateDTO.getEmail());
            userRepository.save(userToUpdate);
            return "Updated successfully!";
        } else {
            return "User not found!";
        }
    }

	public User getUserById(Long id) {
		  Optional<User> user = userRepository.findById(id);  // Assuming you're using a repository like JpaRepository
		    
		    return user.orElse(null); 
	}
}
