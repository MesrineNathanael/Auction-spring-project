package com.kings.auction.AuctionKings.Controllers;

import java.util.List;

import com.kings.auction.AuctionKings.Models.BDD.Auction;
import com.kings.auction.AuctionKings.Repositories.AuctionRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auctions")
public class AuctionsController {

    public final AuctionRepository auctionRepository;

    // ctor
    public AuctionsController(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    /**
     * Récupère toutes les Enchères en BDD 
     * @return Liste D'Enchères 
     */
    @RequestMapping("/all")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<List<Auction>> getAllAuctions() {
        List<Auction> listeAuction =  auctionRepository.findAll();
        if (listeAuction.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucune Enchère trouvé.");
        } else {
            return ResponseEntity.ok(listeAuction);
        }
    }

    /**
     * Retrouve une Enchère selon son ID
     * @param id
     * @return une Enchère
     */
    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Auction> getAuctionById(@PathVariable Integer id) {
        Auction auction = auctionRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(auction);
    }

    /**
     * Permet d'ajouter une Enchère en BDD
     * @param auction
     * @return Une Enchère
     */
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction) {
        Auction savedAuction = auctionRepository.save(auction);
        return ResponseEntity.ok(savedAuction);
    }

    /**
     * Retrouve les Enchères d'un User selon l'ID du User
     * @param id
     * @return Liste D'Enchères
     */
    @RequestMapping("/user/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<List<Auction>> getAuctionsByIdUserAuction(@PathVariable Integer id) {
        List<Auction> auctions = auctionRepository.findByIdUserAuction(id);
        if(auctions.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(auctions);
    }

    /**
     * Retrouve une Enchère selon l'ID du Produit qui lui est rattaché
     * @param id
     * @return Liste D'Enchères
     */
    @RequestMapping("/product/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<List<Auction>> getAuctionsByIdProductAuction(@PathVariable Integer id) {
        List<Auction> auctions = auctionRepository.findByIdProductAuction(id);
        if(auctions.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(auctions);
    }
}
