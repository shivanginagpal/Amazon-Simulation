import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCustomerProfile } from '../../actions/profileAction';
import './customer.css';

class customerProfile extends Component {
    componentDidMount() {
        if(this.props.auth){
           this.props.getCustomerProfile();
        }
    }

    render() {
        const { profile=[], loading } = this.props.profile;
    
        console.log(this.props);
        if (profile === null || loading ) {
            console.log("No profile");
             
          } else {
        console.log("Profile:",profile);
          }
        return (
            <div>
                <Navbar/>
                
                <div className="container" id="userInfo">
                <h1>
                            Login &amp; security
                        </h1>
                        <div class="card w-100 border border-dark" id="infoCard">
            <div class="card-body">
                <div class="row">
                    
                <h5 class="card-title">Name:</h5>
               
              
                <a href="#" class="btn btn-primary col-md-6">Edit</a>
                
                </div>
                <p class="card-text">Shivangi Nagpal</p>
            </div>
            </div>
            <div class="card w-100 border border-dark" id="infoCard">
            <div class="card-body">
                <div class="row">
                    <div class="col-9">
                <h5 class="card-title">Email:</h5>
                </div>
                
                <a href="#" class="btn btn-primary">Edit</a>
                </div>
                <div class="row">
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                </div>
            </div>
            <div className="card w-100" id="eventscard">
<div className="card-body">
  <div className="row">
    <h5 className="card-title col-7" id="eventtext">
      Event name: 
    </h5>
    <div className="col-2">
      <button
        type="button"
        className="btn btn-primary"
        
      >
        Register
      </button>
    </div>
  </div>
  <p className="card-text" id="eventtext">
    Company Name: 
  </p>
  <p className="card-text" id="eventtext">
    Eligibility: 
  </p>
  <div className="row">
    <div className="col-10"></div>
    
  </div>
</div>
</div>
            </div>
            


</div>
            
        )
    }
}

customerProfile.propTypes = {
    getCustomerProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getCustomerProfile })(customerProfile);