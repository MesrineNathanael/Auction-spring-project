package com.kings.auction.AuctionKings.Controllers;

import java.util.List;

import com.kings.auction.AuctionKings.Models.BDD.Category;
import com.kings.auction.AuctionKings.Repositories.CategoryRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoriesController {
    
    public final CategoryRepository categoriesRepository;

    //ctor
    public CategoriesController(CategoryRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    //get all categories
    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public List<Category> getAllCategories() {
        return categoriesRepository.findAll();
    }

    //get category by id
    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public Category getCategoryById(@PathVariable Integer id) {
        return categoriesRepository.findById(id).orElseThrow(RuntimeException::new);
    }
    
    //add category
    @RequestMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public Category createCategory(@RequestBody Category category) {
        Category savedCategory = categoriesRepository.save(category);
        return savedCategory;
    }

    //delete category
    @RequestMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public void deleteCategory(@PathVariable Integer id) {
        categoriesRepository.deleteById(id);
    }
    
}
