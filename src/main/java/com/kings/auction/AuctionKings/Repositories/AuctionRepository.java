package com.kings.auction.AuctionKings.Repositories;

import com.kings.auction.AuctionKings.Models.BDD.Auction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Integer> {
    
}
