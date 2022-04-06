package com.kings.auction.AuctionKings.Controllers;

import java.util.List;

import com.kings.auction.AuctionKings.Models.BDD.Product;
import com.kings.auction.AuctionKings.Repositories.ProductRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductsController {
    //This is the products controller

    public final ProductRepository productRepository;

    //ctor
    public ProductsController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //get all products
    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //get product by id
    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public Product getProductById(@PathVariable Integer id) {
        return productRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    //add product
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    //update product
    @PutMapping("/update/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        Product currentProduct = productRepository.findById(id).orElseThrow(RuntimeException::new);
        currentProduct.setName(product.getName());
        currentProduct.setDescription(product.getDescription());
        currentProduct.setStatus(product.getStatus());
        currentProduct = productRepository.save(currentProduct);
        return ResponseEntity.ok(currentProduct);
    }

    //delete product
    @PutMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Product> deleteProduct(@PathVariable Integer id) {
        Product currentProduct = productRepository.findById(id).orElseThrow(RuntimeException::new);
        productRepository.delete(currentProduct);
        return ResponseEntity.ok(currentProduct);
    }
}
