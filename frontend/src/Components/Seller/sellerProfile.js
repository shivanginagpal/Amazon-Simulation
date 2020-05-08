import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSellerProfile } from '../../actions/profileAction';
import { isFieldEmpty } from '../SignUp/helperApis';
import Navbar from '../Navbar/Navbar';
import SellerProducts from './sellerProducts'

class sellerProfile extends Component {

    async componentDidMount() {
        let sellerId = null;
        
        if (this.props.match && this.props.auth.user.userType === "customer"){
            sellerId = this.props.match.params.seller; 
        }
        await this.props.getSellerProfile(sellerId);
        
    }

    render() {
        const { profile = [], loading } = this.props.profile;
        // console.log(this.props);
        //console.log("Profile:")
        let profileImg;
        let sellerAddr = null;


        if (profile === null || loading) {
            if(this.props.auth.user.userType === "seller"){
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
            }else{
                return(
                    <div>
                    <Navbar />
                    <div className="container">
                        <br />
                        <h2>No exsisting profile for this seller.</h2>
                       
                    </div>
                </div>
                );
             }
    } else if(profile.seller) {
            console.log(profile);
            console.log("Params",this.props.match.params.seller);
            console.log("profile");

            profileImg = isFieldEmpty(profile.sellerProfilePicture) ?
                "https://static.change.org/profile-img/default-user-profile.svg" :
                 profile.sellerProfilePicture;

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
                                            className="rounded-circle card-img-top"
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
                    <SellerProducts id={this.props.match.params.seller}/>
                </div>
            )
        }
        else return "Loading";
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getSellerProfile })(sellerProfile);