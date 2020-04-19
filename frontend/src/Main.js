import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './LandingPage';
import Navbar from './Components/Navbar/Navbar';
import Login from "./Components/Login/loginTemplate";
import Signup from "./Components/SignUp/signupTemplate";


class Main extends Component {
    render(){
        return (
                <div className="bgimg"> 
                    <Route exact path="/" component={Home}/> 
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                </div>
        )
    }
}

export default Main;