//react imoports
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "reactstrap";
import { useParams } from 'react-router-dom';
import { Button } from "reactstrap";

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
    //get the user from the session storage
    const user = JSON.parse(sessionStorage.getItem("user"));
    
    const id = JSON.parse(sessionStorage.getItem("productId"));
    var idStr = id.toString();
    //get the product from the rest api
    fetch('http://localhost:8080/products/' + idStr, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((data) => {
            //test if the product is found
            if (data !== null) {
                //save the product in the session storage
                sessionStorage.setItem("product", JSON.stringify(data));
            }
        });
    //get the product from the session storage and map it to the product details page
    var productId = JSON.parse(sessionStorage.getItem("product")).id;
    var productName = JSON.parse(sessionStorage.getItem("product")).name;
    var productImage = JSON.parse(sessionStorage.getItem("product")).image;
    var productDesc = JSON.parse(sessionStorage.getItem("product")).description;
    var productBasePrice = JSON.parse(sessionStorage.getItem("product")).basePrice;
    var productSellPrice = JSON.parse(sessionStorage.getItem("product")).sellPrice;
    var productEnd = JSON.parse(sessionStorage.getItem("product")).dateEnd;

    var productWithdrawId = JSON.parse(sessionStorage.getItem("product")).idWithdrawProduct;
    var productSellerId = JSON.parse(sessionStorage.getItem("product")).idUserSeller;

    var productSellerName = "";

    fetch('http://localhost:8080/users/' + productSellerId, {
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
						<h4 className="price">Meilleure offre :<span>{productSellPrice} croquettes par {productSellerName}</span></h4>
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
							<button className="add-to-cart btn btn-default" type="button">Encherir</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    );
}