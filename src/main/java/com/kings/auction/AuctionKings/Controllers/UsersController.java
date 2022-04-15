package com.kings.auction.AuctionKings.Controllers;

import java.io.Console;
import java.util.List;
import java.util.Optional;

import com.kings.auction.AuctionKings.Models.BDD.User;
import com.kings.auction.AuctionKings.Repositories.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UsersController {

    public final UserRepository userRepository;

    public UsersController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Permet de retrouver tous les User en BDD
     * @return Liste de User
     */
    @GetMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> listeUsers =  userRepository.findAll();
        if (listeUsers.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun Utilisateur trouvé.");
        } else {
            return ResponseEntity.ok(listeUsers);
        }
    }

    /**
     * Permet de retrouver un User selon son ID
     * @param id
     * @return Un User
     */
    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(user);
    }

    /**
     * Permet d'ajouter un User en BDD
     * @param user
     * @return Un User
     */
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    /**
     * Permet de mettre à jour un User
     * @param id
     * @param user
     * @return Un User
     */
    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
        User currentUser = userRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        currentUser.setUsername(user.getUsername());
        currentUser.setFirstname(user.getFirstname());
        currentUser.setLastname(user.getLastname());
        currentUser.setEmail(user.getEmail());
        currentUser.setPhoneNumber(user.getPhoneNumber());
        currentUser.setStreet(user.getStreet());
        currentUser.setPostalCode(user.getPostalCode());
        currentUser.setCity(user.getCity());
        currentUser.setPassword(user.getPassword());

        currentUser = userRepository.save(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    /**
     * Permet de supprimer un User en BDD
     * @param id
     */
    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Permet de retrouver un User avec son email et son mot de passe
     * @param email
     * @param password
     * @return Un User
     */
    @GetMapping("/connection/email/{email}/password/{password}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    ResponseEntity<User> findUser(@PathVariable String email, @PathVariable String password) {
        User user = userRepository.findByEmail(email);
        var userPass = user.getPassword();
        if (password.equals(userPass)) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(404).build();
    }
}