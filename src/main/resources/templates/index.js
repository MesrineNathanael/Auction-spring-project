import React, { Component } from "react";
import { connect } from "react-redux";
import react from React

class index extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <h1>Hello UwU</h1>
        )
    }
}
export default connect(index)