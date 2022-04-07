package com.kings.auction.AuctionKings.Repositories;

import java.util.Optional;

import com.kings.auction.AuctionKings.Models.BDD.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    //find by email and password
    User findByEmail(String email);
}
