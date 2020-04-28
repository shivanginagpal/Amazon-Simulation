import React, { Component } from 'react'
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import './user.css';
import { Link } from 'react-router-dom';

class userProfile extends Component {
    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <Navbar />
                <div className="container" id="userInfo">
                    <h1>
                        Login &amp; Security
                    </h1>
                    <div class="card w-50 border border-dark" id="infoCard">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-9">
                                    <h5 class="card-title">Name:</h5>
                                </div>
                                <h5 class="card-text" style={{"width":'60%', "padding":'10px 20px'}}>{user.name}</h5>
                                <a href="/editName" class="btn btn-dark" >Edit</a>
                            </div>
                        </div>
                    </div>

                    
                    <div class="card w-50 border border-dark" id="infoCard">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-9">
                                    <h5 class="card-title">Email:</h5>
                                </div>
                                <h5 class="card-text" style={{"width":'60%', "padding":'10px 20px'}}>{user.email}</h5>
                                <a href="/editEmail" class="btn btn-dark" >Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
//mapping state to props
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(userProfile);