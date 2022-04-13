import { Button, Form } from "reactstrap";
import Home from '../Home';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Profil.css";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";


class Profil extends Component {

    state = {
        user:[]
    };
    componentDidMount() {
        fetch('http://localhost:8080/users/'+this.props.match.params.id,{
            method: 'GET',
        })
        .then((response)=>
            {if(response.ok){
                return response.json()
            } else{
                window.location.href = "/";
            }}
         )
        .then((data)=> this.setState({user: data}));
        
      }

      handleChangeUsername(event){
        let stateCopy = this.state.user;
        stateCopy.username = event;
        this.setState(stateCopy);
      }

      handleChangeLastName(event){
        let stateCopy = this.state.user;
        stateCopy.lastname = event;
        this.setState(stateCopy);
      }

      handleChangeCity(event){
        let stateCopy = this.state.user;
        stateCopy.city = event;
        this.setState(stateCopy);
      }

      handleChangePhone(event){
        let stateCopy = this.state.user;
        stateCopy.phoneNumber = event;
        this.setState(stateCopy);
      }

      handleChangePassword(event){
        let stateCopy = this.state.user;
        stateCopy.password = event;
        this.setState(stateCopy);
      }

      handleChangeMail(event){
        let stateCopy = this.state.user;
        stateCopy.email = event;
        this.setState(stateCopy);
      }

      handleChangeFirstName(event){
        let stateCopy = this.state.user;
        stateCopy.firstname = event;
        this.setState(stateCopy);
      }

      handleChangeStreet(event){
        let stateCopy = this.state.user;
        stateCopy.street = event;
        this.setState(stateCopy);
      }

      handleChangePostalCode(event){
        let stateCopy = this.state.user;
        stateCopy.postalCode = event;
        this.setState(stateCopy);
      }

    render(){
        let jsonUser = JSON.parse(window.sessionStorage.getItem("user"));
        return(
            <div className="content-profile">
            <h1 className="profile-edit-title">Profil</h1>
            <Form>
                <div className="twofields">
                    <div>
                        <div>
                            <label>* Nom d'utilisateur :          </label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={this.state.user.username}
                                onChange={(e) => this.handleChangeUsername(e.target.value)}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>* Nom :                              </label>
                            <input
                                type="text"
                                placeholder="Nom"
                                name="lastName"
                                onChange={(e) => this.handleChangeLastName(e.target.value)}
                                value={this.state.user.lastname}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>Ville :                              </label>
                            <input
                                type="text"
                                placeholder="Ville"
                                name="city"
                                onChange={(e) => this.handleChangeCity(e.target.value)}
                                value={this.state.user.city}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>Téléphone :                             </label>
                            <input
                                type="number"
                                placeholder="Téléphone"
                                name="phone"
                                onChange={(e) => this.handleChangePhone(e.target.value)}
                                value={this.state.user.phoneNumber}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>* Mot de Passe :                            </label>
                            <input
                                type="password"
                                placeholder="Mot de Passe"
                                name="password"
                                onChange={(e) => this.handleChangePassword(e.target.value)}
                                value={this.state.user.password}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>* Email :                              </label>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => this.handleChangeMail(e.target.value)}
                                value={this.state.user.email}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>* Prénom :                                  </label>
                            <input
                                type="text"
                                placeholder="Prénom"
                                name="firstName"
                                onChange={(e) => this.handleChangeFirstName(e.target.value)}
                                value={this.state.user.firstname}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>Adresse :                            </label>
                            <input
                                type="text"
                                placeholder="Adresse"
                                name="address"
                                onChange={(e) => this.handleChangeStreet(e.target.value)}
                                value={this.state.user.street}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>Code Postal :                       </label>
                            <input
                                type="number"
                                placeholder="Code Postal"
                                name="zipCode"
                                onChange={(e) => this.handleChangePostalCode(e.target.value)}
                                value={this.state.user.postalCode}
                                disabled={!(jsonUser.id === this.state.user.id)}
                            />
                        </div>
                        <div>
                            <label>Credit :                             </label>
                            <input
                                type="number"
                                placeholder="Téléphone"
                                name="phone"
                                value={this.state.user.credit}
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
            </Form>
            {jsonUser.id === this.state.user.id ? 
                    
                <Button className="inscription-button" type="submit">
                    Modifier le profil
                </Button>
                    
            : null}
        </div>
        );
    }
}


export default withRouter(Profil);