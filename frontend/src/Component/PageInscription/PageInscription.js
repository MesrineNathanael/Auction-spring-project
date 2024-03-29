import { Button, Container, FormFeedback } from "reactstrap";
import React from "react";
import { Form, Row, Col } from "reactstrap";
import "./PageInscription.css";


export default function PageInscription() {

    //registration page
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    //state of the form
    const [formState, setFormState] = React.useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        phone: "",
    });

    //handle change of the form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //handle submit of the form
    const handleSubmit = (event) => {
        //check if fields are filled
        if (
            formState.username === "" ||
            formState.email === "" ||
            formState.password === "" ||
            formState.passwordConfirm === "" ||
            formState.firstName === "" ||
            formState.lastName === ""
        ) {
            alert("Veuillez remplir tous les champs");
            return;
        }
        //check if the password and the password confirmation are the same
        else if (formState.password !== formState.passwordConfirm) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        const checkEmail = () =>{
            if(formState.email.match(regex)){
                return formState.email
            } else {
                alert("Votre email n'est pas valide")
                return undefined
            }
        }

        const checkCp = () =>{
            if(formState.zipCode.length === 5){
                return formState.zipCode
            } else {
                alert("Votre code postal n'est pas valide")
                return undefined
            }
        }

        const checkPhone = () =>{
            if(formState.phone.length === 10){
                return formState.phone
            } else {
                alert("Votre Téléphone n'est pas valide")
                return undefined
            }
        }

        event.preventDefault();
        console.log(formState);
        //send the form to the server via rest api
        //rest api address : http://localhost:8080/users/add
        //redirect to the login page
        var url = "http://localhost:8080/users/add";
        var data = {
            username: formState.username,
            firstname: formState.firstName,
            lastname: formState.lastName,
            email: checkEmail(),
            phoneNumber: checkPhone(),
            street: formState.address,
            postalCode: checkCp(),
            city: formState.city,
            password: formState.password,
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
                //test if the user is created
                if (data !== null) {
                    //redirect to the login page
                    //fetch the new user information
                    var url = "http://localhost:8080/users/connection/email/" + data.email + "/password/" + data.password;
                    fetch(url, {
                        method: "GET",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("User found after sign in : " + data);
                            //test if the user is found
                            if ("email" && "postalCode" && "phoneNumber" in data) {
                                //redirect to the home page
                                window.sessionStorage.setItem("isConnected", true);
                                window.sessionStorage.setItem("user", JSON.stringify(data));
                                window.location.href = "/";
                            }
                        });
                }
            });
    };

    return (

        <div className="content-profile">
            <h1 className="profile-edit-title">Inscription</h1>
            <p className="profile-edit-text">
                * : Champs obligatoires
            </p>
            <Form onSubmit={handleSubmit}>
                <div className="twofields">
                    <div>
                        <div>
                            <label>* Nom d'utilisateur :          </label>
                            <input
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={formState.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>* Email :                              </label>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>* Mot de Passe :                            </label>
                            <input
                                type="password"
                                placeholder="Mot de Passe"
                                name="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>* Confirmation du Mot de Passe :</label>
                            <input
                                type="password"
                                placeholder="Confirmation du Mot de Passe"
                                name="passwordConfirm"
                                value={formState.passwordConfirm}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>* Prénom :                                  </label>
                            <input
                                type="text"
                                placeholder="Prénom"
                                name="firstName"
                                value={formState.firstName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>* Nom :                              </label>
                            <input
                                type="text"
                                placeholder="Nom"
                                name="lastName"
                                value={formState.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Adresse :                            </label>
                            <input
                                type="text"
                                placeholder="Adresse"
                                name="address"
                                value={formState.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Ville :                              </label>
                            <input
                                type="text"
                                placeholder="Ville"
                                name="city"
                                value={formState.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Code Postal :                       </label>
                            <input
                                type="number"
                                placeholder="Code Postal"
                                name="zipCode"
                                value={formState.zipCode}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Téléphone :                             </label>
                            <input
                                type="number"
                                placeholder="Téléphone"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </Form>
            <Button className="inscription-button" type="submit" onClick={handleSubmit}>
                S'inscrire
            </Button>
        </div>
    );

}
