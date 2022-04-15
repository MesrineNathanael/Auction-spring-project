package com.kings.auction.AuctionKings.Controllers;

import java.util.List;

import com.kings.auction.AuctionKings.Models.BDD.Category;
import com.kings.auction.AuctionKings.Repositories.CategoryRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/categories")
public class CategoriesController {
    
    public final CategoryRepository categoriesRepository;

    //ctor
    public CategoriesController(CategoryRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    /**
     * Retrouve toutes les Catégories en BDD
     * @return Liste de Catégories
     */
    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> listeCategory =  categoriesRepository.findAll();
        if (listeCategory.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucune Catégorie trouvée.");
        } else {
            return ResponseEntity.ok(listeCategory);
        }
    }

    /**
     * Retrouve une Catégorie selon son ID
     * @param id
     * @return Une Catégorie
     */
    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Category> getCategoryById(@PathVariable Integer id) {
        Category category = categoriesRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(category);
    }
    
    /**
     * Permet d'ajouter une Catégorie
     * @param category
     * @return Une Catégorie
     */
    @RequestMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category savedCategory = categoriesRepository.save(category);
        return ResponseEntity.ok(savedCategory);
    }

    /**
     * Permet de supprimer une Catégorie selon son ID
     * @param id
     */
    @RequestMapping("/delete/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        categoriesRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
}
