import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Slideshow from '../../slideshow';
import './loginTemplate.css';
import avatar from "./../../images/avatar.png";

class loginTemplate extends Component {
    render(){

        return (
            <div>
                <Navbar/>
                <br/>
                <br/>

                <form class="modal-content animate" action="" method="POST">

                <div class="imgcontainer">
                  <img src={avatar} alt="Avatar" class="avatar"/>
                  <h1 style={{textAlign:"center"}}>Welcome Back</h1>
                </div>

                <div class="container">
                  <input type="text" placeholder="Enter Username" name="username" required/>
                  <input type="password" placeholder="Enter Password" name="password" required/>
                  <button type="submit" class="login-signup">Login</button>
                  <input type="checkbox" style={{margin:"26px 30px"}}/> Remember me
                  <a href="#" style={{textDecoration:"none", float:"right", marginRight:"34px", marginTop:"26px"}}>Forgot Password ?</a>
                </div>

              </form>

            </div>
        );
    }
}

export default loginTemplate;