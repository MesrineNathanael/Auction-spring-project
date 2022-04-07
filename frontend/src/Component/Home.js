import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import { Select } from "@mui/material";
import { withRouter } from "react-router-dom";
import styles from "../Views/Home.module.css"


class Home extends Component{

    state = {
        categories: []
      };
      componentDidMount() {
        fetch('http://localhost:8080/categories/all',{
          method: 'GET'
          })
          .then((response)=> response.json())
          .then((data)=> this.setState({categories: data}))
      }

    render(){
        
        console.log(this.state.categories);
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
                    <div className={styles.search}>
                        <Select/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);