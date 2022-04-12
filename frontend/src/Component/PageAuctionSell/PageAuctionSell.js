import { Button, Container, FormFeedback } from "reactstrap";
import React from "react";
import { Form, Row, Col } from "reactstrap";
import { MenuItem, Select, FormControl, InputLabel} from "@mui/material";
import { Box } from "@mui/system";
import "./PageAuctionSell.css"
import { Component } from "react";
import { withRouter } from "react-router-dom";

class AuctionSell extends Component {

    constructor(props){
        super(props);
        this.state = {name: '',value: '', categories:[]};
    
        this.data = {
            name: '',
            description: '',
            dateBegin: '',
            dateEnd: '',
            base_Price: '',
            status: '',
            idCategoryProduct: '',
            idUserSeller: ''
        };

        this.jsonUser = JSON.parse(window.sessionStorage.getItem("user"));
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:8080/categories/all', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => this.setState({categories:data}));
    }

    //handle change of the form
    handleChange(event){
        const { name, value } = event.target;
        this.setState({name:name, value:value})
    };




    //handle submit of the form
    handleSubmit(event){
        //check if fields are filled
        if (
            this.data.name === "" ||
            this.data.description === "" ||
            this.data.date_Begin === "" ||
            this.data.date_End === "" ||
            this.data.basePrice === "" ||
            this.data.status === "" ||
            this.data.idCatProduct === ""
        ) {
            alert("Veuillez remplir tous les champs");
            return;
        }


        event.preventDefault();

        //send the form to the server via rest api
        //rest api address : http://localhost:8080/users/add
        //redirect to the login page
        var url = "http://localhost:8080/products/add";
        var data = {
            name: this.data.name,
            description: this.data.description,
            dateBegin: this.data.date_Begin,
            dateEnd: this.data.date_End,
            base_Price: this.data.basePrice,
            status: this.data.status,
            idCategoryProduct: this.data.idCatProduct,
            idUserSeller: this.jsonUser.id
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
                console.log(data);
        })
    };

    render() {
        console.log(this.state.products)
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
                                    value={this.data.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label>* Description :                              </label>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={this.data.description}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label>* Date de Début :                            </label>
                                <input
                                    type="date"
                                    placeholder="Date de Début"
                                    name="date_Begin"
                                    value={this.data.date_Begin}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label>* Date de Fin :</label>
                                <input
                                    type="date"
                                    placeholder="Date de Fin"
                                    name="date_End"
                                    value={this.data.date_End}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <label>* Prix de Base :                                  </label>
                                <input
                                    type="text"
                                    placeholder="Prix de Base"
                                    name="basePrice"
                                    value={this.data.basePrice}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div>
                                <label>* Status :                              </label>
                                <input
                                    type="text"
                                    placeholder="Status"
                                    name="status"
                                    value={this.data.status}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <Box className="box"  sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="AuctionSell_cat">Catégories</InputLabel>
                                        <Select className="cat" label="Catégories" labelId="AuctionSell_cat">
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
