package com.kings.auction.AuctionKings.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
//class user with attributes
//id, username, firstname, lastname, email, password, phoneNumber, street, city, postalCode, credit and admin as bool
public class User {
    @Id
    @GeneratedValue
    private long id;
    
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phoneNumber;
    private String street;
    private String city;
    private String postalCode;
    private int credit;
    private boolean admin;
    
    //constructor
    public User(long id, String username, String firstname, String lastname, String email, String password,
            String phoneNumber, String street, String city, String postalCode, int credit, boolean admin) {
        super();
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.street = street;
        this.city = city;
        this.postalCode = postalCode;
        this.credit = credit;
        this.admin = admin;
    }
    
    //getters and setters
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getFirstname() {
        return firstname;
    }
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password
                ;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public String getPostalCode() {
        return postalCode;
    }
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }
    public int getCredit() {
        return credit;
    }
    public void setCredit(int credit) {
        this.credit = credit;
    }
    public boolean isAdmin() {
        return admin;
    }
    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
    
    //toString
    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", firstname=" + firstname + ", lastname=" + lastname
                + ", email=" + email + ", password=" + password + ", phoneNumber=" + phoneNumber + ", street=" + street
                + ", city=" + city + ", postalCode=" + postalCode + ", credit=" + credit + ", admin=" + admin + "]";
    }
    
}
