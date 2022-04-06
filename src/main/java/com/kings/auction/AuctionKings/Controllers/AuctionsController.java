package com.kings.auction.AuctionKings.Controllers;

import java.util.List;

import com.kings.auction.AuctionKings.Models.BDD.Auction;
import com.kings.auction.AuctionKings.Repositories.AuctionRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auctions")
public class AuctionsController {
    
    public final AuctionRepository auctionRepository;

    //ctor
    public AuctionsController(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    //get all auctions
    @RequestMapping("/all")
    public List<Auction> getAllAuctions() {
        return auctionRepository.findAll();
    }

    //get auction by id
    @RequestMapping("/{id}")
    public Auction getAuctionById(@PathVariable Integer id) {
        return auctionRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    //add auction
    @PostMapping("/add")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction) {
        Auction savedAuction = auctionRepository.save(auction);
        return ResponseEntity.ok(savedAuction);
    }

}
