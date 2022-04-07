import { Button } from "reactstrap";
import React, { Component } from "react";
import { Form } from "reactstrap";
import "./PageInscription.css";

export default function PageInscription() {

    //registration page

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
            email: formState.email,
            phoneNumber: formState.phone,
            street: formState.address,
            postalCode: formState.zipCode,
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
                    window.location.href = "/connection";
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
                <div className="onefield">
                    <div>
                        <label>* Nom d'utilisateur :</label>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formState.username}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>* Email :</label>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>* Mot de Passe :</label>
                        <input
                            type="text"
                            placeholder="Mot de Passe"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>* Confirmation du Mot de Passe :</label>
                        <input
                            type="text"
                            placeholder="Confirmation du Mot de Passe"
                            name="passwordConfirm"
                            value={formState.passwordConfirm}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>* Prénom :</label>
                        <input
                            type="text"
                            placeholder="Prénom"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>* Nom :</label>
                        <input
                            type="text"
                            placeholder="Nom"
                            name="lastName"
                            value={formState.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>Adresse :</label>
                        <input
                            type="text"
                            placeholder="Adresse"
                            name="address"
                            value={formState.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>Ville :</label>
                        <input
                            type="text"
                            placeholder="Ville"
                            name="city"
                            value={formState.city}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>Code Postal :</label>
                        <input
                            type="text"
                            placeholder="Code Postal"
                            name="zipCode"
                            value={formState.zipCode}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="onefield">
                    <div>
                        <label>Téléphone :</label>
                        <input
                            type="text"
                            placeholder="Téléphone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Form>

            <Button className="inscription-button" type="submit" onClick={handleSubmit}>
                S'inscrire
            </Button>
        </div>
    );

}
