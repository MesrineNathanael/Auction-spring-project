import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./NavBar.module.css"
import logo from "./logoAuctionKings.png"
import { Link } from "react-router-dom";


class AuctionNavBar extends Component{
    isConnexionPage = false;

    render(){
        let isConnected = false;
        let size = !isConnected ? 20 : 50;
        
        return(
            <div className={styles.navbar}>
                <Link to="/">
                    <img alt="Auction Kings" className={styles.img} src={logo}></img>
                </Link>
                {}
                <div className={styles.links} style={{width:size+"%"}}>
                    
                

                {!isConnected ? 
                    <>
                    <Link to="/connection">
                        <h2>Connexion</h2>
                    </Link>
                    <Link to='/inscription'>
                        <h2>Inscription</h2>
                    </Link>
                    </> 
                    :
                    <>
                    <Link to="/mesEncheres">
                        <h2>Enchères</h2>
                    </Link>
                    <Link to='/vendre'>
                        <h2>Vendre un article</h2>
                    </Link>
                    <Link to='/profil'>
                        <h2>Mon profil</h2>
                    </Link>
                    <Link to='/disconnect'>
                        <h2>Déconnexion</h2>
                    </Link>
                    </> 
                }
                    
                

                </div>
            </div>
        );
    }
}

export default withRouter(AuctionNavBar);