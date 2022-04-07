import { Alert } from "bootstrap";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form } from "reactstrap";
import { Button } from "reactstrap";

import "./PageConnection.css"


export default function PageConnection() {

    //Connection page

    //state of the form
    const [formState, setFormState] = React.useState({
        email: "",
        password: "",
    });

    const [users, setUserState] = React.useState({
        user : []
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
            formState.email === "" ||
            formState.password === ""
        ) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        event.preventDefault();
        
        //send the form to the server via rest api
        //rest api address : http://localhost:8080/users/connection
        //redirect to the auction page
        var url = "http://localhost:8080/users/connection/email/"+formState.email+"/password/"+formState.password;
        fetch(url, {
            method: "GET",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
        })
            .then((response) => response.json())
            .then((data) => { 
                //if the user is found the data will be an array of one user
                //check if the data contain id
                if ("id" in data) {
                    //save the user in the session
                    window.sessionStorage.setItem("user", JSON.stringify(data));
                    window.sessionStorage.setItem("isConnected", true);
                    //redirect to the auction page
                    window.location.href = "/enchere";
                }else{
                    alert("Connection impossible")
                }

            });
    };

    return (
        <div className="content-profile">
            <h1 className="profile-edit-title">Connection</h1>
            <Form onSubmit={handleSubmit}>
                <div className="onefield">
                    <div>
                        <label>Email :</label>
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
                        <label>Password :</label>
                        <input
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Form>
            <Button className="btn-primary" type="submit" onClick={handleSubmit}>
                {
                    
                }
                S'inscrire
            </Button>
        </div>
    );

}

