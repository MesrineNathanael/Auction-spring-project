package com.kings.auction.AuctionKings.Controllers;

import java.util.List;
import java.util.stream.Collectors;

import com.kings.auction.AuctionKings.Models.BDD.Product;
import com.kings.auction.AuctionKings.Models.BDD.User;
import com.kings.auction.AuctionKings.Repositories.ProductRepository;
import com.kings.auction.AuctionKings.Repositories.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/products")
public class ProductsController {
    //This is the products controller

    public final ProductRepository productRepository;
    public final UserRepository userRepository;

    //ctor
    public ProductsController(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    /**
     * Permet de retrouver tous les Produits en BDD
     * @return Liste de Produits
     */
    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> listeProducts =  productRepository.findAll();
        if (listeProducts.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun Produit trouvé.");
        } else {
            return ResponseEntity.ok(listeProducts);
        }
    }

    /**
     * Permet de retrouver un Produit grâce à son ID
     * @param id
     * @return Un Produit
     */
    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        Product product = productRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(product);
    }

    /**
     * Permet d'ajouter un Produit en BDD
     * @param product
     * @return Un Produit
     */
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    /**
     * Permet de mettre à jour un Produit
     * @param id
     * @param product
     * @return Un Produit
     */
    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        Product currentProduct = productRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        currentProduct.setName(product.getName());
        currentProduct.setDescription(product.getDescription());
        currentProduct.setStatus(product.getStatus());
        currentProduct = productRepository.save(currentProduct);
        return ResponseEntity.ok(currentProduct);
    }

    /**
     * Permet de supprimer un Produit
     * @param id
     * @return Un Produit
     */
    @PutMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
        Product currentProduct = productRepository.findById(id).orElseThrow(RuntimeException::new);
        productRepository.delete(currentProduct);
        return ResponseEntity.ok(currentProduct);
    }

    /**
     * Permet de retrouver le vendeur d'un Produit
     * @return Liste de User
     */
    @GetMapping("/seller/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<List<User>> findSeller() {
        List<Product> listProducts = productRepository.findAll();
        List<Integer> listIdUser = (List<Integer>) listProducts.stream()
            .map(Product::getIdUserSeller)
            .distinct()
            .collect(Collectors.toList());
        
        List<User> listUser = userRepository.findAllById(listIdUser);

        return ResponseEntity.ok(listUser);
    }

}
