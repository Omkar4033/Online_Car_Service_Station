package com.wheely.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wheely.dao.UserRepository;
import com.wheely.dto.UserUpdateDTO;
import com.wheely.pojos.User;
import com.wheely.service.interfaces.UserServiceInterface;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        return (user != null && user.getPassword().equals(password)) ? user : null;
    }

    @Override
    public User registerUser(User newUser) {
        return userRepository.save(newUser);
    }

    @Override
    public String removeUser(Long id) {
        Optional<User> userToDelete = userRepository.findById(id);
        if (userToDelete.isPresent()) {
            userRepository.delete(userToDelete.get());
            return "User with ID " + id + " deleted";
        } else {
            return "User not found!";
        }
    }

    @Override
    public String updateUserDetails(UserUpdateDTO userUpdateDTO, Long id) {
        Optional<User> userToUpdate = userRepository.findById(id);
        if (userToUpdate.isPresent()) {
            User user = userToUpdate.get();
            user.setName(userUpdateDTO.getName());
            user.setEmail(userUpdateDTO.getEmail());
            userRepository.save(user);
            return "Updated successfully!";
        } else {
            return "User not found!";
        }
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
