import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { FormControl, Link } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { withRouter } from "react-router-dom";
import styles from "../Views/Home.module.css";


class Home extends Component {

    state = {
        categories: [],
        products: [],
        users: [],
        productsToShow: [],
        searchBar: "",
        categBar: 0
    };

    componentDidMount() {
        fetch('http://localhost:8080/categories/all', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => this.setState({ categories: data }));
        fetch('http://localhost:8080/products/all', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => this.setState({ products: data, productsToShow: data }));
        fetch('http://localhost:8080/users/all', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => this.setState({ users: data }));
    }

    filterProducts(searchName){
        this.setState({searchBar: searchName})

        if(searchName != ""){
            this.setState({productsToShow: this.state.products.filter(product => product.name.toUpperCase().includes(searchName.toUpperCase()))}) 
        }else{
            this.setState({productsToShow: this.state.products})
        }

        if(this.state.categBar != 0){
            if(searchName != ""){
                this.setState({productsToShow: this.state.productsToShow.filter(product => product.name.toUpperCase().includes(searchName.toUpperCase()))}) 
            }else{
                this.setState({productsToShow: this.state.productsToShow})
            }
        } else{
            if(searchName != ""){
                this.setState({productsToShow: this.state.products.filter(product => product.name.toUpperCase().includes(searchName.toUpperCase()))}) 
            }else{
                this.setState({productsToShow: this.state.products})
            }
        }

    }

    filterCategories(categBar){
        this.setState({categBar: categBar})

        if(this.state.searchBar != ""){
            if(categBar != 0){
                this.setState({productsToShow: this.state.productsToShow.filter(product => product.idCategoryProduct == categBar)});
            }else{
                this.setState({productsToShow: this.state.productsToShow})
            }
        } else{
            if(categBar != 0){
                this.setState({productsToShow: this.state.products.filter(product => product.idCategoryProduct ==categBar)});
            }else{
                this.setState({productsToShow: this.state.products})
            }
        }


    }

    render() {
        console.log(this.state.products)
        return (
            <div className={styles.main}>
                <div className={styles.searchMain}>
                    <div className={styles.search}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            value={this.state.searchBar}
                            label="Search"
                            onChange={
                                (e) => this.filterProducts(e.target.value)
                            }
                            fullWidth
                        />
                    </div>
                    <div className={styles.categ}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="Select_categ">Catégories</InputLabel>
                                <Select label="Catégories" labelId="Select_categ" onChange={(e) => this.filterCategories(e.target.value)}>
                                    <MenuItem value={0}>-------</MenuItem>
                                    {this.state.categories.map((cat) =>
                                        <MenuItem value={cat.idCategory}>{cat.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>

                <div className={styles.Products}>
                    <ul>
                        {this.state.productsToShow.map((products) =>
                            <li>
                                <div className={styles.product}>

                                    <div className={styles.imgContainer}>
                                        <div className={styles.imgProduct}>
                                            <img src={products.image} alt="LOGO"></img>
                                        </div>
                                    </div>

                                    <div className={styles.txtContainer}>
                                        <a href={`/product`} onClick={window.sessionStorage.setItem("productId", products.id)} title={products.id} >
                                            <span className={styles.title}>{products.name}</span>
                                        </a>
                                        <span className={styles.title}>{products.name}</span>
                                        <span className={styles.price}>Prix : {products.basePrice} credits</span>
                                        <span className={styles.dateEnd}>Date de fin : {products.dateEnd}</span>
                                        <span className={styles.seller}>Vendeur : <Link href={'/profil/'+products.idUserSeller}>
                                        {this.state.users.map((users) => 
                                            products.idUserSeller === users.id ? users.username : null
                                        )}
                                        </Link></span>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        );
    }
}

export default withRouter(Home);
