import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authAction';
import { clearProfile } from '../../actions/profileAction';
import logo from "./../../images/amazon-logo.jpg";
import "../Navbar/navbar.css";


class Navbar extends Component {
    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.clearProfile();
        window.location.href = '/';

    }
    render() {
        const { isAuthenticated, user } = this.props.auth;

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

        const authLinks = (
            <div>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item nav-link text-light">
                        {user.name}
                    </li>

                    <li class="nav-item">
                        <a class="nav-link text-light" href="/" onClick={this.handleLogout.bind(this)}>Logout</a>
                    </li>
                </ul>
            </div>
        )

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-dark" id="navbg">
                    <a class="navbar-brand text-warning" id="titlefont" href="/adminHome"><img src={logo} id="logoimage"></img></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link text-light" href="/adminHome" >Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled text-light" href="/inventory">Inventory</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled text-light" href="/viewSellerList">View Sellers</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled text-light" href="/viewOrdersAdmin">View Orders</a>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
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