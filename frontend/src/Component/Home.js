import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { withRouter } from "react-router-dom";
import styles from "../Views/Home.module.css";


class Home extends Component{

    state = {
        categories: [],
        products:[]
      };
      componentDidMount() {
        fetch('http://localhost:8080/categories/all',{
          method: 'GET',
          })
          .then((response)=> response.json())
          .then((data)=> this.setState({categories: data}));
        fetch('http://localhost:8080/products/all',{
         method: 'GET'
         })
         .then((response)=> response.json())
         .then((data)=> this.setState({products: data}))
      }

    render(){
        console.log(this.state.products)
        return(
            <div className={styles.main}>
                <div className={styles.searchMain}>
                    <div className={styles.search}>
                        <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        label="Search"
                        />
                    </div>
                    <div className={styles.categ}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="Select_categ">Catégories</InputLabel>
                                <Select label="Catégories" labelId="Select_categ">
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
                        {this.state.products.map((products) =>
                            <li>
                                <div className={styles.product}>

                                    <div className={styles.imgContainer}>
                                        <div className={styles.imgProduct}>
                                            <img src={products.image} alt="LOGO"></img>
                                        </div>
                                    </div>

                                    <div className={styles.txtContainer}>
                                        <span className={styles.title}>{products.name}</span>
                                        <span className={styles.price}>Prix : {products.sellPrice} credits</span>
                                        <span className={styles.dateEnd}>Date de fin : {products.dateEnd}</span>
                                        <span className={styles.seller}>Vendeur : {products.idUserSeller}</span>
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