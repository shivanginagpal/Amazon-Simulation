import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './LandingPage';
import Navbar from './Navbar';


class Main extends Component {
    render(){
        return (
                <div className="bgimg"> 
                    <Route exact path="/" component={Home}/> 
                </div>
        )
    }
}

export default Main;