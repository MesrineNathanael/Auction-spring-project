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
                    {this.state.products.map((products) =>
                        <div className={styles.product}>
                            <h1>{products.name}</h1>
                            <p>{products.description}</p>
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

export default withRouter(Home);