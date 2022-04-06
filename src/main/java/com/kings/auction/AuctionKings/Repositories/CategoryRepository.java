package com.kings.auction.AuctionKings.Repositories;

import com.kings.auction.AuctionKings.Models.BDD.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    
}
