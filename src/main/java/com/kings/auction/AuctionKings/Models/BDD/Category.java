package com.kings.auction.AuctionKings.Models.BDD;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "categories")
public class Category {
    //fields idCategory, name
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "int")
    private Integer idCategory;

    private String name;

    //constructor empty
    public Category() {
    }

    //constructor
    public Category(Integer idCategory, String name) {
        super();
        this.idCategory = idCategory;
        this.name = name;
    }

    //getters and setters
    public Integer getIdCategory() {
        return idCategory;
    }

    public void setIdCategory(Integer idCategory) {
        this.idCategory = idCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
