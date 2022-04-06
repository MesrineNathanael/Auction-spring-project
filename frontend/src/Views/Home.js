import React, { Component } from "react";
import { withRouter } from "react-router-dom";


class Home extends Component{
    render(){
        return(
            <div>
                <div>HOME PAGE</div>
            </div>
        );
    }
}

export default withRouter(Home);