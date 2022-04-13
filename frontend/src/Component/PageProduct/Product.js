//react imoports
import React, { Component } from "react";
import { Form } from "reactstrap";

//product details page
export default function Product() {
    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    };

    clearCacheData();

    //check if a counter is set in session storage
    if (sessionStorage.getItem("counter") === null) {
        //if not set, set it to 0
        sessionStorage.setItem("counter", 0);
    }
    //if a counter is set, increment it
    else {
        sessionStorage.setItem("counter", parseInt(sessionStorage.getItem("counter")) + 1);
    }

    

    //get the user from the session storage
    const user = JSON.parse(sessionStorage.getItem("user"));
    var productId = JSON.parse(sessionStorage.getItem("productId"));

    //get the product from the rest api
    const getProductDetails = async () => {
        const response = await fetch(
            "http://localhost:8080/products/" + productId,
            {
                method: "GET",
            }
        );
        const data = await response.json();
        return data;
    };

    //get the auctions from the rest api
    const getAuctions = async () => {
        const response = await fetch(
            "http://localhost:8080/auctions/product/" + productId,
            {
                method: "GET",
            }
        );
        const data = await response.json();
        return data;
    };

    getProductDetails().then((data) => {
        sessionStorage.setItem("product", JSON.stringify(data));
        if (parseInt(sessionStorage.getItem("counter")) >= 3) {
            //refresh the page
            window.location.reload();
            //set the counter to 0
            sessionStorage.setItem("counter", 0);
        }
    });

    getAuctions().then((data) => {
        sessionStorage.setItem("auctions", JSON.stringify(data));
    });


    //get the product from the session storage and map it to the product details page

    var productName = JSON.parse(sessionStorage.getItem("product")).name ?? "";
    var productImage = JSON.parse(sessionStorage.getItem("product")).image ?? "";
    var productDesc = JSON.parse(sessionStorage.getItem("product")).description ?? "";
    var productBasePrice = JSON.parse(sessionStorage.getItem("product")).basePrice ?? "";
    var productBaseSellerId = JSON.parse(sessionStorage.getItem("product")).idUserSeller ?? "";
    var productEnd = JSON.parse(sessionStorage.getItem("product")).dateEnd ?? "";

    var productWithdrawId = JSON.parse(sessionStorage.getItem("product")).idWithdrawProduct ?? "";
    var productSellerId = "";
    var productSellerName = "";

    var productSellPrice = JSON.parse(sessionStorage.getItem("auctions")).priceAuction ?? "";

    var bestBidderId = "";
    var bestBidderName = "";

    //check if product details are not empty
    if (productName === "" && productBasePrice === "") {
        //redirect to the home page

    }

    //if the auctions are not empty, get the seller name who bet the most from the auctions sessionstorage
    const getBestBidder = () => {
        if (JSON.parse(sessionStorage.getItem("auctions")).length > 0) {
            var max = 0;
            var maxIndex = 0;
            for (var i = 0; i < JSON.parse(sessionStorage.getItem("auctions")).length; i++) {
                if (JSON.parse(sessionStorage.getItem("auctions"))[i].priceAuction > max) {
                    max = JSON.parse(sessionStorage.getItem("auctions"))[i].priceAuction;
                    maxIndex = i;
                }
            }
            productSellerId = JSON.parse(sessionStorage.getItem("auctions"))[maxIndex].idUserAuction;
            productSellPrice = JSON.parse(sessionStorage.getItem("auctions"))[maxIndex].priceAuction;
            //get the seller name from the rest api
            const getSellerName = async () => {
                const response = await fetch(
                    "http://localhost:8080/users/" + productSellerId,
                    {
                        method: "GET",
                    }
                );
                const data = await response.json();
                return data;
            };
            getSellerName().then((data) => {
                sessionStorage.setItem("bestBidder", JSON.stringify(data));
            }

            );
            bestBidderId = JSON.parse(sessionStorage.getItem("bestBidder")).id;
            bestBidderName = JSON.parse(sessionStorage.getItem("bestBidder")).username;
        }
    };

    getBestBidder();

    fetch('http://localhost:8080/users/' + productBaseSellerId, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            //test if the product is found
            if (data !== null) {
                //save the product in the session storage
                sessionStorage.setItem("productSeller", JSON.stringify(data.username));
            }
        });

    var productSellerName = JSON.parse(sessionStorage.getItem("productSeller"));

    var priceBid = 0;
    //const on change
    const onChange = (e) => {
        priceBid = e.target.value;
    };

    const onClick = (e) => {
        e.preventDefault();
        console.log(priceBid + " try to be bidded");

        getBestBidder();
        if (priceBid <= productSellPrice) {
            //send the bid to the server
            //redirect to the login page
            alert("Votre offre de [" + priceBid + "] est inferieur à la meilleure offre qui est de [" + productSellPrice + "]");
            window.location.reload(false);
            return;
        }
        else {
            //send the bid to the server
            var url = "http://localhost:8080/auctions/add";
            var data = {
                idUserAuction: user.id,
                idProductAuction: productId,
                dateTimeAuction: new Date().getTime().toString(),
                priceAuction: priceBid,
            };
            fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    //test if the product is found
                    if (data !== null) {
                        //refresh the page
                        window.location.reload(false);
                    }
                });
        }
    };

    //check if the product id is equal to the product id in the session storage
    if (productId !== JSON.parse(sessionStorage.getItem("product")).id) {
        //if counter is greater than 1

        //when the product is loaded, redirect to the home page
    }

    return (
        <div className="container">
            <div className="card">
                <div className="container-fliud">
                    <div className="wrapper row">
                        <div className="h-100 row align-items-center">
                            <h1>Detail vente</h1>
                        </div>
                        <div className="preview col-md-6">
                            <div className="preview-pic tab-content">
                                <div className="tab-pane active" id="pic-1"><img src={productImage} /></div>
                            </div>
                        </div>
                        <div className="details col-md-6">
                            <h3 className="product-title">{productName}</h3>
                            <h4 className="product-description">Description :</h4>
                            <p className="product-description">{productDesc}</p>
                            <h4 className="price">Meilleure offre :{
                                bestBidderName === "" ? " Aucune offre" : (<span>{productSellPrice} croquettes par {bestBidderName}</span>)
                            }</h4>
                            <h4 className="price">Mise a prix :<span>{productBasePrice} croquettes</span></h4>
                            <br>
                            </br>
                            <h4 className="price">Fin de l'enchere :<span>{productEnd}</span></h4>
                            <h4 className="price">Retrait :<span>withdraw</span></h4>
                            <h4 className="price">Vendeur :<span>{productSellerName}</span></h4>
                            <br></br>
                            <p className="vote"><strong>{(30 + (Math.random() * 70)).toFixed(0)}%</strong> des acheteurs recommande ce vendeur ! <strong>({(30 + (Math.random() * 70)).toFixed(0)} avis)</strong></p>
                            <br></br>
                            <div className="action">
                                <Form>
                                    {
                                        //if the user is logged in
                                        sessionStorage.getItem("isConnected") === "true" ? (
                                            <div className="form-group">
                                                <label htmlFor="lbl">Prix</label>
                                                <input type="number" onChange={onChange} placeholder={productSellPrice + " minimum"} className="form-control" id="lbl" aria-describedby="emailHelp" />
                                                <button className="add-to-cart btn btn-default" onClick={onClick} type="button">Encherir</button>
                                            </div>) : (
                                            <div className="form-group">
                                                <label htmlFor="lbl">Vous devez etre connectez pour encherir</label>
                                            </div>)
                                    }
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}