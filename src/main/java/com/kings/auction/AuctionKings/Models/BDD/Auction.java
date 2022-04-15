package com.kings.auction.AuctionKings.Models.BDD;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import com.kings.auction.AuctionKings.Models.BDD.Composite.AuctionKeys;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "auction")
@IdClass(AuctionKeys.class)
public class Auction {
    //fields idUserAuction, isProductAuction, dateTimeAuction, priceAuction
    @Id
    @Type(type = "int")
    private Integer idUserAuction;

    @Id
    @Type(type = "int")
    private Integer idProductAuction;

    @Id
    @Type(type = "string")
    private String dateTimeAuction;

    private double priceAuction;

    //constructor empty
    public Auction() {
    }

    //constructor
    public Auction(Integer idUserAuction, Integer idProductAuction, String dateTimeAuction, double priceAuction) {
        super();
        this.idUserAuction = idUserAuction;
        this.idProductAuction = idProductAuction;
        this.dateTimeAuction = dateTimeAuction;
        this.priceAuction = priceAuction;
    }

    //getters and setters
    public Integer getIdUserAuction() {
        return idUserAuction;
    }

    public void setIdUserAuction(Integer idUserAuction) {
        this.idUserAuction = idUserAuction;
    }

    public Integer getIdProductAuction() {
        return idProductAuction;
    }

    public void setIdProductAuction(Integer isProductAuction) {
        this.idProductAuction = isProductAuction;
    }

    public String getDateTimeAuction() {
        return dateTimeAuction;
    }

    public void setDateTimeAuction(String dateTimeAuction) {
        this.dateTimeAuction = dateTimeAuction;
    }

    public double getPriceAuction() {
        return priceAuction;
    }

    public void setPriceAuction(double priceAuction) {
        this.priceAuction = priceAuction;
    }
}
