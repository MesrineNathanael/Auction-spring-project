package com.kings.auction.AuctionKings.Repositories;

//import User
import com.kings.auction.AuctionKings.Models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {


}
