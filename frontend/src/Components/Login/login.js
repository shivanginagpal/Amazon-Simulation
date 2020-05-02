import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from '../../actions/authAction';
import './loginTemplate.css';
import avatar from "./../../images/avatar.png";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      userType: '',
      errors: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.userType === 'customer')
        this.props.history.push('/customerHome');
      else if (this.props.auth.user.userType === 'seller')
        this.props.history.push('/sellerHome');
      else if(this.props.auth.user.userType === 'admin')
        this.props.history.push('/adminHome'); 
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("in componentWillReceiveProps");
    if (nextProps.auth.isAuthenticated) {
      if (nextProps.auth.user.userType === 'customer')
        this.props.history.push('/customerHome');
      else if (nextProps.auth.user.userType === 'seller')
        this.props.history.push('/sellerHome');
      else if (this.props.auth.user.userType === 'admin')
        this.props.history.push('/adminHome');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType
    }
    console.log(user);
    this.props.loginUser(user);
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
            <h1 style={{ textAlign: "center" }}>Welcome Back</h1>
          </div>

          <div class="login-container">
            <div className="form-group">
              <input type="text"
                className={classnames('form-control form-control-lg login-form-control login-text', {
                  'is-invalid': errors.email
                })}
                placeholder="Enter Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange} />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input type="password"
                className={classnames('form-control form-control-lg login-form-control login-text', {
                  'is-invalid': errors.password
                })}
                placeholder="Enter Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange} />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
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
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" className="custom-control-input "
                id="admin"
                name="userType"
                value="admin"
                onChange={this.onChange} />
              <label className="custom-control-label" htmlFor="admin">Admin</label>
            </div>
            <button type="submit" class="login-signup">Login</button>
            <br />
            <input type="checkbox" style={{ margin: "26px 30px" }} /> Remember me
                  <a href="#" style={{ textDecoration: "none", float: "right", marginRight: "34px", marginTop: "26px" }}>Forgot Password ?</a>
          </div>

        </form>

      </div>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(login);