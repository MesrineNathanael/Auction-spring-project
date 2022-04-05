package com.kings.auction.AuctionKings.Repositories;

//import User
import com.kings.auction.AuctionKings.Models.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public interface UserRepository extends JpaRepository<User, Long> {


}
