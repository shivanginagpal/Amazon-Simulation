import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomerProfile } from '../../actions/profileAction';
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import Navbar from '../Navbar/Navbar';
import CustomerReviews from './customerReviews';

class customerProfile extends Component {

    componentDidMount() {
        this.props.getCustomerProfile();
    }

    render() {

        const { profile = [], loading } = this.props.profile;
        console.log(this.props);
        console.log("Profile:")
        let profileImg;

        if (profile === null || loading) {
            return (
                <div>
                    <Navbar />
                    <div className="container">
                        <br />
                        <h2>No exsisting profile.</h2>
                        <a
                            type="button"
                            className="btn btn-primary"
                            href="/userProfile">
                            Set Up Profile
                         </a>
                        <div>
                            <h2>Your Comments and Ratings</h2>
                            <CustomerReviews />
                        </div>
                    </div>
                </div>
            );
        } else {

            profileImg = isFieldEmpty(profile.customerProfilePicture) ?
                "https://static.change.org/profile-img/default-user-profile.svg" :
                profile.customerProfilePicture;

            return (
                <div>
                    <Navbar />
                    <br />
                    <div className="col-md-12">
                        <div className="card card-body bg-white text-black mb-3">
                            <div className="row">
                                <div className="col-4 col-md-3 m-auto">
                                    <img
                                        className="card-img-top rounded-circle"
                                        src={profileImg}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <h1 className="text-center profile-text">{profile.customer.name}
                                </h1>

                            </div>
                        </div>
                        <div>
                            <h2>Your Comments and Ratings</h2>
                            <CustomerReviews />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCustomerProfile })(customerProfile);
