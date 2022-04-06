import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./PageConnection.css"


class PageConnection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            password: "",
            email:"",
          };
    }

    fetchUser(){
        fetch('http://localhost:8080/users/connection/'+this.props.email+'/password/'+this.props.password,{
            method: 'GET'
            })
            .then((response)=> response.json())
            .then((data)=> this.setState({users: data}))
    };

    render() {
        return (
            <div>
                <div className="content-profile">
                <h1 className="profile-edit-title">Bienvenue</h1>
                    <div className="onefield">
                        <div>
                            <label>Email :</label>
                            <input type="text" placeholder="Email"
                                defaultValue=""
                                value={this.state.email}
                            />

                        </div>
                    </div>

                    <div className="onefield">
                        <div>
                            <label>Mot de Passe :</label>
                            <input type="text" placeholder="Mot de Passe"
                                defaultValue=""
                                value={this.state.password}
                            />

                        </div>
                    </div>

                    
                <button type="submit" className="connection"
                >
                    Connexion
                </button>
                </div>

            </div>
        )


    }

}
export default withRouter(PageConnection);