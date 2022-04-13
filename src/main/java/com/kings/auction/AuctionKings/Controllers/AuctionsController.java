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

    // get all auctions
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

    // get auction by id
    @RequestMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Auction> getAuctionById(@PathVariable Integer id) {
        Auction auction = auctionRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ResponseEntity.ok(auction);
    }

    // add auction
    @PostMapping("/add")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction) {
        Auction savedAuction = auctionRepository.save(auction);
        return ResponseEntity.ok(savedAuction);
    }

    // get auctions by user id
    @RequestMapping("/user/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public List<Auction> getAuctionsByIdUserAuction(@PathVariable Integer id) {
        return auctionRepository.findByIdUserAuction(id);
    }

    // get auctions by product id
    @RequestMapping("/product/{id}")
    @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
    public List<Auction> getAuctionsByIdProductAuction(@PathVariable Integer id) {
        return auctionRepository.findByIdProductAuction(id);
    }
}
