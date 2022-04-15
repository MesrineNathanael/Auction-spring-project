import { Button} from "reactstrap";
import React from "react";
import { Form } from "reactstrap";
import { MenuItem, Select, FormControl, InputLabel} from "@mui/material";
import { Box } from "@mui/system";
import "./PageAuctionSell.css"
import { Component } from "react";
import { withRouter } from "react-router-dom";

class AuctionSell extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    jsonUser = JSON.parse(window.sessionStorage.getItem("user"));

    productState = {
        name: '',
        description: '',
        dateBegin: '',
        dateEnd: '',
        basePrice: '',
        idCategoryProduct: '',
        idUserSeller: this.jsonUser.id
    };
    state = {
        product : this.productState,
        categories:[]
    };

    componentDidMount(){
        fetch('http://localhost:8080/categories/all', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => this.setState({categories:data}));
    }

    handleChangeName(event){
        let stateCopy = this.state.product;
        stateCopy.name = event;
        this.setState(stateCopy);

    }
    handleChangeDesc(event){
        let stateCopy = this.state.product;
        stateCopy.description = event;
        this.setState(stateCopy);
    }
    handleChangeDateBegin(event){
        let stateCopy = this.state.product;
        stateCopy.dateBegin = event;
        this.setState(stateCopy);
    }
    handleChangeDateEnd(event){
        let stateCopy = this.state.product;
        stateCopy.dateEnd = event;
        this.setState(stateCopy);
    }
    handleChangeBasePrice(event){
        let stateCopy = this.state.product;
        stateCopy.basePrice = event;
        this.setState(stateCopy);
    }
    handleChangeidCategory(event){
        let stateCopy = this.state.product;
        stateCopy.idCategoryProduct = event;
        this.setState(stateCopy);
    }

    //handle submit of the form
    handleSubmit(event){
        //check if fields are filled
        let stateCopy = this.state.product;
        if (
            stateCopy.name === "" ||
            stateCopy.description === "" ||
            stateCopy.dateBegin === "" ||
            stateCopy.dateEnd === "" ||
            stateCopy.basePrice === "" ||
            stateCopy.idCatProduct === ""
        ) {
            alert("Veuillez remplir tous les champs");
            return;
        }


        event.preventDefault();

        //send the form to the server via rest api
        //rest api address : http://localhost:8080/users/add
        //redirect to the login page
        var url = "http://localhost:8080/products/add";
        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stateCopy),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
        })
    };

    render() {
        return (
            <div className="content-profile">
                <h1 className="profile-edit-title">Inscription</h1>
                <p className="profile-edit-text">
                    * : Champs obligatoires
                </p>
                <Form onSubmit={this.handleSubmit}>
                    <div className="onefield">
                        <div>
                            <div>
                                <label>* Nom :          </label>
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    name="name"
                                    value={this.state.product.name}
                                    onChange={(e) => this.handleChangeName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>* Description :                              </label>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={this.state.product.description}
                                    onChange={(e) => this.handleChangeDesc(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>* Date de Début :                            </label>
                                <input
                                    type="date"
                                    placeholder="Date de Début"
                                    name="date_Begin"
                                    value={this.state.product.date_Begin}
                                    onChange={(e) => this.handleChangeDateBegin(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>* Date de Fin :</label>
                                <input
                                    type="date"
                                    placeholder="Date de Fin"
                                    name="date_End"
                                    value={this.state.product.date_End}
                                    onChange={(e) => this.handleChangeDateEnd(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>* Prix de Base :                                  </label>
                                <input
                                    type="text"
                                    placeholder="Prix de Base"
                                    name="basePrice"
                                    value={this.state.product.basePrice}
                                    onChange={(e) => this.handleChangeBasePrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div>
                                <Box className="box"  sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="AuctionSell_cat">Catégories</InputLabel>
                                        <Select className="cat" label="Catégories" labelId="AuctionSell_cat" onChange={(e) => this.handleChangeidCategory(e.target.value)}>
                                            <MenuItem>-------</MenuItem>
                                            {this.state.categories.map((cat) =>
                                                <MenuItem value={cat.idCategory}>{cat.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Form>
                <Button className="inscription-button" type="submit" onClick={this.handleSubmit}>
                    Ajouter l'enchère
                </Button>
            </div>
        );
    }
}

export default withRouter(AuctionSell);
