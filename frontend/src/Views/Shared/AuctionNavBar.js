import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./NavBar.module.css"
import logo from "./logoAuctionKings.png"

class AuctionNavBar extends Component{
    render(){
        return(
            <div className={styles.navbar}>
                <img className={styles.img} src={logo}></img>
            </div>
        );
    }
}

export default withRouter(AuctionNavBar);