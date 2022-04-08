package com.kings.auction.AuctionKings.Repositories;

import com.kings.auction.AuctionKings.Models.BDD.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    
}

