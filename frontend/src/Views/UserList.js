import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import AppNavBar from "./AppNavBar";

class UserList extends Component{

    constructor (props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true
        };
        this.removeUser = this.removeUser.bind(this);
    }

    componentDidMount() {
        fetch('/users')
            .then(response => response.json())
            .then(data => this.setState({ users: data, isLoading: false }));
    }
}
export default UserList;