package com.kings.auction.AuctionKings.Controller;

import java.util.List;

import com.kings.auction.AuctionKings.Models.User;
import com.kings.auction.AuctionKings.Repositories.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UsersController {

    public final UserRepository userRepository;

    public UsersController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public User getUserById(@PathVariable Integer id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<User> updateUser(@PathVariable Integer id,@RequestBody User user) {
        User currentUser = userRepository.findById(id).orElseThrow(RuntimeException::new);
        currentUser.setFirstname(user.getFirstname());
        currentUser.setLastname(user.getLastname());
        currentUser.setEmail(user.getEmail());
        currentUser.setPassword(user.getPassword());

        currentUser = userRepository.save(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<User> deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}