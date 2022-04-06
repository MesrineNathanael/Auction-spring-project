import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./PageConnection.css"


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/add")
        }
    }, [])

    function login()
    {
        let item={email,password}
        let result = await fetch("http://localhost:8080/users/connection/email/{email}/password/{password}",{
            method: 'GET',
            headers:
        }
        
        
        )
    }   

    return (
        <div>
            <div className="content-profile">
                <h1 className="profile-edit-title">Bienvenue</h1>
                <div className="onefield">
                    <div>
                        <label>Email :</label>
                        <input type="text" placeholder="Email"
                            defaultValue=""
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                </div>

                <div className="onefield">
                    <div>
                        <label>Mot de Passe :</label>
                        <input type="text" placeholder="Mot de Passe"
                            defaultValue=""
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>
                </div>


                <button type="submit" className="connection"
                    onClick={login}>
                    Connexion
                </button>
            </div>

        </div>
    )
}
export default withRouter(Login);