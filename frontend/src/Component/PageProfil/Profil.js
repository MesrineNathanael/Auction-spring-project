import { Button, Form } from "reactstrap";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Profil.css";


class Profil extends Component {


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    state = {
        user: []
    };
    jsonUser = JSON.parse(window.sessionStorage.getItem("user"));
    componentDidMount() {
        fetch('http://localhost:8080/users/' + this.props.match.params.id, {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    window.location.href = "/";
                }
            }
            )
            .then((data) => this.setState({ user: data }));

    }

    handleChangeUsername(event) {
        let stateCopy = this.state.user;
        stateCopy.username = event;
        this.setState(stateCopy);
    }

    handleChangeLastName(event) {
        let stateCopy = this.state.user;
        stateCopy.lastname = event;
        this.setState(stateCopy);
    }

    handleChangeCity(event) {
        let stateCopy = this.state.user;
        stateCopy.city = event;
        this.setState(stateCopy);
    }

    handleChangePhone(event) {
        let stateCopy = this.state.user;
        stateCopy.phoneNumber = event;
        this.setState(stateCopy);
    }

    handleChangePassword(event) {
        let stateCopy = this.state.user;
        stateCopy.password = event;
        this.setState(stateCopy);
    }

    handleChangeMail(event) {
        let stateCopy = this.state.user;
        stateCopy.email = event;
        this.setState(stateCopy);
    }

    handleChangeFirstName(event) {
        let stateCopy = this.state.user;
        stateCopy.firstname = event;
        this.setState(stateCopy);
    }

    handleChangeStreet(event) {
        let stateCopy = this.state.user;
        stateCopy.street = event;
        this.setState(stateCopy);
    }

    handleChangePostalCode(event) {
        let stateCopy = this.state.user;
        stateCopy.postalCode = event;
        this.setState(stateCopy);
    }

    //handle delete of the user submit
    handleDelete(event) {
        event.preventDefault();
        //ask the user if he is sure to delete the user
        if (window.confirm("Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.")) {
            var url = "http://localhost:8080/users/delete/" + this.jsonUser.id;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => {
                    if (response.ok) {
                        //remove isConnected from sessionStorage
                        window.sessionStorage.removeItem("isConnected");
                        //remove user from sessionStorage
                        window.sessionStorage.removeItem("user");
                        console.log("user deleted");
                    } else {
                        console.log("error");
                    }
                }
                )
        }
    }

    //handle submit of the form
    handleSubmit(event) {
        //check if fields are filled
        let stateCopy = this.state.user;
        if (
            stateCopy.username === "" ||
            stateCopy.lastname === "" ||
            stateCopy.firstname === "" ||
            stateCopy.city === "" ||
            stateCopy.phoneNumber === "" ||
            stateCopy.password === "" ||
            stateCopy.email === "" ||
            stateCopy.street === "" ||
            stateCopy.postalCode === ""
        ) {
            alert("Veuillez remplir tous les champs");
            return;
        }


        event.preventDefault();

        //send the form to the server via rest api
        //rest api address : http://localhost:8080/users/add
        //redirect to the login page
        var url = "http://localhost:8080/users/update/" + this.jsonUser.id;
        fetch(url, {
            method: "PUT",
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
    }

    render() {
        return (
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                                    disabled={!(this.jsonUser.id === this.state.user.id)}
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
                {this.jsonUser.id === this.state.user.id ?
                    (
                        <span>
                            <Button className="inscription-button" type="submit" onClick={this.handleSubmit}>
                                Modifier le profil
                            </Button>
                            <Button className="suppression-button" type="submit" onClick={this.handleDelete}>
                                Supprimer le profil
                            </Button>
                        </span>) : null}
            </div>
        );
    }
}



export default withRouter(Profil);