import React, { Component } from "react";
import { connect } from "react-redux";
import react from React
//This is the main page in recat.js
class index extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1>Hello World</h1>
            </div>
        
        )
    }
}
export default connect(index)