package com.kings.auction.AuctionKings.Repositories;

import java.util.List;

import com.kings.auction.AuctionKings.Models.BDD.Auction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Integer> {

    List<Auction> findByIdUserAuction(Integer id);

    List<Auction> findByIdProductAuction(Integer id);

}
