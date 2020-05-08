import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearProfile } from '../../actions/profileAction';
import logo from "./../../images/amazon-logo.jpg";
import "./navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.clearProfile();
        window.location.href = '/';

    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        
        let customerLinks = null;
        let sellerLinks = null;
        let authLinks = null;
        
        if (isAuthenticated){
            const { userType, id } = user;
            
            customerLinks = (
                <div>
                    <a class="dropdown-item" href="/customer">Your Account</a>
                    <a class="dropdown-item" href="/customer">Your Orders</a>
                    <a class="dropdown-item" href="/savedAddresses">Your Addresses</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="/paymentInfo">Payment Options</a>
                    <a class="dropdown-item" href="/customerProfile">Your Amazon Profile</a>
                </div>
            )

            sellerLinks = (
                <div>
                    <a class="dropdown-item" href="/sellerOptions">Your Account</a>
                    <a class="dropdown-item" href="/sellerOrders">Your Received Orders</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item"> <Link to={{pathname:`/sellerProfile/${id}`}}>Your Amazon Profile</Link></a>
                </div>
            )
           
            authLinks = (
                <div>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Account & Orders
                                </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                {(userType === 'customer') ? customerLinks:sellerLinks}
                            </div>
                        </li>
    
                        <li class="nav-item nav-link text-light">
                            {user.name}
                        </li>

                        <li class="nav-item">
                            {(userType === 'customer') && <a class="nav-link text-light" href="/cart" >Cart</a>}
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link text-light" href="/" onClick={this.handleLogout.bind(this)}>Logout</a>
                        </li>
                    </ul>
                </div>
            )
    }
        const guestLinks = (
            <div>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link text-light" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-light" href="/signup">SignUp</a>
                    </li>
                </ul>
            </div>
        );

        

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-dark" id="navbg">
                    <a class="navbar-brand text-warning" id="titlefont" href="/"><img src={logo} id="logoimage"></img></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link text-light" href="/" >Home <span class="sr-only">(current)</span></a>
                            </li>




                            {/* <li class="nav-item">
                                <a class="nav-link disabled text-light" href="#">Disabled</a>
                            </li> */}
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </div>

        );
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearProfile })(Navbar);