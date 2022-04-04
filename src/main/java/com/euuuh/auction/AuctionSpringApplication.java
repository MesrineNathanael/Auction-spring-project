package com.euuuh.auction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuctionSpringApplication {

	public static void main(String[] args) {
		var oui = new Test();
		oui.test();
		System.out.println("oui  aouzrehfc");
		SpringApplication.run(AuctionSpringApplication.class, args);
	}

}
