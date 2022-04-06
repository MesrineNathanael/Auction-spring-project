package com.kings.auction.AuctionKings.Models.BDD;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "products")
//class product with attributes
//id, name, description, dateBegin, dateEnd, basePrice, sellPrice, status, idCategoryProduct, idUserSeller, idWithdrawProduct, image
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "int")
    private Integer id;

    //fields
    private String name;
    private String description;
    private String dateBegin;
    private String dateEnd;
    private double basePrice;
    private double sellPrice;
    private String status;
    private Integer idCategoryProduct;
    private Integer idUserSeller;
    private Integer idWithdrawProduct;
    private String image;

    //constructor empty
    public Product() {
    }

    //constructor
    public Product(Integer id, String name, String description, String dateBegin, String dateEnd, double basePrice,
            double sellPrice, String status, Integer idCategoryProduct, Integer idUserSeller,
            Integer idWithdrawProduct, String image) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateBegin = dateBegin;
        this.dateEnd = dateEnd;
        this.basePrice = basePrice;
        this.sellPrice = sellPrice;
        this.status = status;
        this.idCategoryProduct = idCategoryProduct;
        this.idUserSeller = idUserSeller;
        this.idWithdrawProduct = idWithdrawProduct;
        this.image = image;
    }

    //getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDateBegin() {
        return dateBegin;
    }

    public void setDateBegin(String dateBegin) {
        this.dateBegin = dateBegin;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(double basePrice) {
        this.basePrice = basePrice;
    }

    public double getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(double sellPrice) {
        this.sellPrice = sellPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getIdCategoryProduct() {
        return idCategoryProduct;
    }

    public void setIdCategoryProduct(Integer idCategoryProduct) {
        this.idCategoryProduct = idCategoryProduct;
    }

    public Integer getIdUserSeller() {
        return idUserSeller;
    }

    public void setIdUserSeller(Integer idUserSeller) {
        this.idUserSeller = idUserSeller;
    }

    public Integer getIdWithdrawProduct() {
        return idWithdrawProduct;
    }

    public void setIdWithdrawProduct(Integer idWithdrawProduct) {
        this.idWithdrawProduct = idWithdrawProduct;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

}
