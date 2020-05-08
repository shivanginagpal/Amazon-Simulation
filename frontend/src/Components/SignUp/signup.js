import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './../Login/loginTemplate.css';
import avatar from "./../../images/avatar.png";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registeruser } from '../../actions/authAction';


class signup extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            userType: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.userType === 'customer')
                this.props.history.push('/customerHome');
            else if (this.props.auth.userType === 'seller')
                this.props.history.push('sellerHome');
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("in componentWillReceiveProps");
        if (nextProps.errors) {
            console.log("received error");
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            userType: this.state.userType,
        }
        console.log(newUser);

        this.props.registeruser(newUser,this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="bgimg">
                <Navbar />
                <br />
                <br />
                <form class="modal-content animate" id="loginform" onSubmit={this.onSubmit}>

                    <div class="imgcontainer">
                        <img src={avatar} alt="Avatar" class="avatar" />
                        <h1 style={{ textAlign: "center" }}>Please fill the following details</h1>
                    </div>

                    <div class="login-container">
                        <input type="text"
                            className={classnames('form-control form-control-lg login-form-control login-text', {
                                'is-invalid': errors.name
                            })} 
                            placeholder="Enter Name or UserName"
                            name="name" value={this.state.name} 
                            onChange={this.onChange} 
                        />
                        {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                        )}

                        <input type="email" 
                            className={classnames('form-control form-control-lg login-form-control login-text', {
                                'is-invalid': errors.email
                              })}
                            placeholder="Enter email" 
                            name="email" value={this.state.email} 
                            onChange={this.onChange} 
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}

                        <input type="password"
                            className={classnames('form-control form-control-lg login-form-control login-text', {
                                'is-invalid': errors.password
                              })} 
                            placeholder="Enter Password" 
                            name="password" value={this.state.password} 
                            onChange={this.onChange} 
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}

                        {/* <input type="text" placeholder="Enter phone number xxx-xxx-xxxx" name="phone" required/> */}
                        <div className={classnames('custom-control custom-radio custom-control-inline')} >
                            <input type="radio" className={classnames('custom-control-input', {
                                'is-invalid': errors.userType
                            })}
                                id="customer"
                                name="userType"
                                value="customer"
                                onChange={this.onChange} />
                            <label className="custom-control-label" htmlFor="customer">Customer</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input"
                                id="seller"
                                name="userType"
                                value="seller"
                                onChange={this.onChange} />
                            <label className="custom-control-label" htmlFor="seller">Seller</label>
                        </div>
                        <button type="submit" class="login-signup">SIGN UP</button>
                        <br />
                        <input type="checkbox" style={{ margin: "26px 30px" }} /> Remember me
                    <a href="#" style={{ textDecoration: "none", float: "right", marginRight: "34px", marginTop: "26px" }}>Forgot Password ?</a>
                    </div>

                </form>
            </div>
        );
    }
}

signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registeruser })(withRouter(signup));