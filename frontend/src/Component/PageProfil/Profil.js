import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import styles from "./Profil.module.css";


class Profil extends Component {

    state = {
        user:[]
      };
      componentDidMount() {
        fetch('http://localhost:8080/users/'+this.props.match.params.id,{
            method: 'GET',
        })
        .then((response)=> response.json())
        .then((data)=> this.setState({user: data}));
        console.log("len : " + this.state.user.length)
        if(this.state.user.length === 0){
            return <Redirect to='/'/>
        }
      }

    render(){
        let jsonUser = JSON.parse(window.sessionStorage.getItem("user"));
        console.log(this.state.user);
        return(
            <div className={styles.profil}>
        
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <tr>
                                    <th><span>Pseudo :</span></th>
                                    <td>{this.state.user.username}</td>
                                </tr>
                                <tr>
                                    <th><span>Prénom :</span></th>
                                    <td>{this.state.user.firstname}</td>
                                </tr>
                                <tr>
                                    <th><span>Nom :</span></th>
                                    <td>{this.state.user.lastname}</td>
                                </tr>
                                <tr>
                                    <th><span>Email :</span></th>
                                    <td>{this.state.user.email}</td>
                                </tr>
                            </td>

                            <td>
                                <tr>
                                    <th><span>Numéro de téléphone :</span></th>
                                    <td>{this.state.user.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <th><span>Adresse :</span></th>
                                    <td>{this.state.user.street}</td>
                                </tr>
                                <tr>
                                    <th><span>Ville :</span></th>
                                    <td>{this.state.user.city}</td>
                                </tr>
                                <tr>
                                    <th><span>Code Postal :</span></th>
                                    <td>{this.state.user.postalCode}</td>
                                </tr>
                                <tr>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <th><span>Crédits :</span></th>
                                <td className={styles.alignLeft}>{this.state.user.credit}</td>
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
        );
    }
}


export default withRouter(Profil);