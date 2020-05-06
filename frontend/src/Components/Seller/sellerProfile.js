import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSellerProfile } from '../../actions/profileAction';
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import Navbar from '../Navbar/Navbar';
import SellerProducts from './sellerProducts'

class sellerProfile extends Component {

    componentDidMount() {
        this.props.getSellerProfile();
    }

    render() {
        const { profile = [], loading } = this.props.profile;
        console.log(this.props);
        console.log("Profile:")
        let profileImg;
        let sellerAddr = null;

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
                    </div>
                </div>
            );
    } else {

            profileImg = isFieldEmpty(profile.sellerProfilePicture) ?
                "https://static.change.org/profile-img/default-user-profile.svg" :
                backendURL + "/downloadProfileImg/" + profile.sellerProfilePicture;

            if (!isFieldEmpty(profile.sellerAddress)) {
                sellerAddr = (<h2 className="profile-text text-center">
                    Located At: {profile.sellerAddress} </h2>)
            }

            return (
                <div>
                    <Navbar />
                    <br />
                    <div className="container">
                        <div className="col-md-12">
                            <div className="card card-body bg-white text-black mb-3">
                                <div className="row">
                                    <div className="col-4 col-md-2 m-auto">
                                        <img
                                            className="rounded-circle"
                                            src={profileImg}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h1 className="text-center profile-text">{profile.seller.name}
                                    </h1>
                                    {sellerAddr}
                                </div>
                            </div>
                        </div>
                    </div>
                    <SellerProducts />
                </div>
            )
        }
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getSellerProfile })(sellerProfile);