//react imoports
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "reactstrap";

//product details page
class Product extends Component {

    constructor(props){
        super(props);
        if(sessionStorage.getItem("isConnected")){
            this.user = JSON.parse(sessionStorage.getItem("user"));
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    state ={
        product:[],
        auctions:[],
        auctionMaxPrice:[],
        userSeller:[],
        usersAuction:[],
        hasAuction:false,
        isAuctionClosed:false,
        priceToBid:0
    }

    componentDidMount() {
        fetch('http://localhost:8080/products/'+ this.props.match.params.id, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => this.setState({ product: data }))
            .then((data) =>
                fetch('http://localhost:8080/users/'+ this.state.product.idUserSeller, {
                    method: 'GET'
                })
                .then((response) => response.json())
                .then((data) => this.setState({ userSeller: data}))
            )
            .then((date)=>{
                if(this.state.product.status === "closed"){
                    this.setState({isAuctionClosed:true});
                    console.log("closed");
                }
            });
        fetch('http://localhost:8080/auctions/product/'+ this.props.match.params.id, {
            method: 'GET'
        })
            .then((response) => 
                {if(response.ok){
                    this.setState({hasAuction:true})
                    return response.json()
                } else{
                    this.setState({hasAuction:false})
                }}
            )
            .then((data) => this.setState({ auctions: data}))
            .then((data) =>
                {if(this.state.hasAuction){
                    let maxPrice = 0;
                    let idMaxBid = 0;
                    let auctionCopy=null;
                    this.state.auctions.forEach(function(elem){
                        if(maxPrice < elem.priceAuction) 
                            idMaxBid = elem.idUserAuction;
                            auctionCopy = elem;
                    });
                    this.setState({auctionMaxPrice: auctionCopy});
                    fetch('http://localhost:8080/users/'+ idMaxBid, {
                        method: 'GET'
                    })
                    .then((response) => response.json())
                    .then((data) => this.setState({ usersAuction: data}))
                }}
            );
    }

    onChange(event){
        this.setState({priceToBid:event});
        console.log(this.state.priceToBid)
    }

    handleSubmit(event){
        if (
            this.state.priceToBid === 0
        ) {
            alert("Veuillez remplir tous les champs");
            return;
        } else if(this.state.priceToBid <= this.state.auctionMaxPrice.priceAuction){
            alert("Enchère inferieure au prix affiché");
            return;
        }

        var data = {
            idUserAuction: JSON.parse(window.sessionStorage.getItem("user")).id,
            idProductAuction: this.props.match.params.id,
            dateTimeAuction: new Date().getTime().toString(),
            priceAuction: this.state.priceToBid,
        };


        event.preventDefault();

        //send the form to the server via rest api
        //rest api address : http://localhost:8080/auctions/add
        //redirect to the login page
        var url = "http://localhost:8080/auctions/add";
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
                console.log(data);
                window.location.href = "/product/"+this.props.match.params.id;
        })
    };


    render(){
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
                                    <div className="tab-pane active" id="pic-1"><img src={this.state.product.image} /></div>
                                </div>
                            </div>
                            <div className="details col-md-6">
                                <h3 className="product-title">{this.state.product.name}</h3>
                                <h4 className="product-description">Description :</h4>
                                <p className="product-description">{this.state.product.description}</p>
                                <h4 className="price">Meilleure offre :{
                                    !this.state.hasAuction ? " Aucune offre" : (<span>{this.state.auctionMaxPrice.priceAuction} credits par {this.state.userSeller.username}</span>)
                                }</h4>
                                <h4 className="price">Mise a prix :<span>{this.state.product.basePrice} credits</span></h4>
                                <br>
                                </br>
                                <h4 className="price">Fin de l'enchere :<span>{this.state.product.dateEnd}</span></h4>
                                <h4 className="price">Retrait :<span>withdraw</span></h4>
                                <h4 className="price">Vendeur :<span>{this.state.userSeller.username}</span></h4>
                                <br></br>
                                <div className="action">
                                    <Form>
                                        {
                                            this.state.isAuctionClosed ?
                                            <Form controlId="formBasicEmail">
                                                <div className="form-group">
                                                    <label htmlFor="lbl">Enchere terminé</label>
                                                    <br></br>
                                                    {!this.state.hasAuction ? <label htmlFor="lbl">Aucune enchère sur cet article</label> : (<label>Produit remporté par {this.state.userSeller.username} pour {this.state.auctionMaxPrice.priceAuction} credits</label>)}
                                                </div>
                                            </Form> : sessionStorage.getItem("isConnected") === "true" ? (
                                                <div className="form-group">
                                                    <label htmlFor="lbl">Prix</label>
                                                    <input type="number" onChange={(e) => this.onChange(e.target.value)} placeholder={this.state.auctionMaxPrice.priceAuction + " minimum"} className="form-control" id="lbl" aria-describedby="emailHelp" />
                                                    <button className="add-to-cart btn btn-default" type="button" onClick={this.handleSubmit}>Encherir</button>
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
}

export default withRouter(Product);