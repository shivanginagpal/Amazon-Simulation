import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Slideshow from '../../slideshow';
import './../Login/loginTemplate.css';
import avatar from "./../../images/avatar.png";

class signUpTemplate extends Component {
    render(){

        return (
            <div>
                <Navbar/>
                <br/>
                <br/>
                <form class="modal-content animate" action="signup.php" method="post">

                    <div class="imgcontainer">
                    <img src={avatar} alt="Avatar" class="avatar"/>
                    <h1 style={{textAlign:"center"}}>Please fill the following details</h1>
                    </div>

                    <div class="container">
                    <input type="text" placeholder="Enter Username" name="uname" required/>
                    <input type="password" placeholder="Enter Password" name="psw" required/>
                    <input type="email" placeholder="Enter email" name="email" required/>
                    <input type="text" placeholder="Enter phone number xxx-xxx-xxxx" name="phone" required/>
                    <button type="submit" class="login-signup">SIGN UP</button>
                    <input type="checkbox" style={{margin:"26px 30px"}}/> Remember me
                    <a href="#" style={{textDecoration:"none", float:"right", marginRight:"34px", marginTop:"26px"}}>Forgot Password ?</a>
                    </div>

                </form>
            </div>
        );
    }
}

export default signUpTemplate;