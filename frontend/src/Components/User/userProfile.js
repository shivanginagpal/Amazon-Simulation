import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSellerProfile, getCustomerProfile } from '../../actions/profileAction';
import { backendURL, isFieldEmpty } from '../SignUp/helperApis';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import './user.css';


class userProfile extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            upload: false,
            file: ""
        }
    }
    componentDidMount() {
        console.log(this.props.auth.user.userType);
        if (this.props.auth.user.userType === 'customer')
            this.props.getCustomerProfile();
        else
            this.props.getSellerProfile();
    }

    showModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    handleUpload = event => {
        console.log(event.target.files[0]);
        this.setState({ file: event.target.files[0] });
    };

    uploadFile = async () => {
        console.log("In upload file...", this.state.file);

        if (this.state.file !== null) {
            const formData = new FormData();
            formData.append("file", this.state.file);

            await axios((this.props.auth.user.userType === 'customer') ?
                "/updateCustomerProfilePic/profilepics" : "/updateSellerProfilePic/profilepics", {
                method: "post",
                data: formData,
                config: { headers: { "Content-Type": "multipart/form-data" } }
            })

        }
    };

    render() {
        const closeBtn = (
            <button className="close" onClick={() => this.showModal()}>
                &times;
            </button>
        );

        const { user } = this.props.auth;
        const { profile = [], loading } = this.props.profile;
        console.log(this.props);
        console.log("Profile:")
        let profileImg;
        let sellerAddr = "No Address Added";
        let sellerAddress = null;
        if (profile === null || loading) {
            profileImg = "https://static.change.org/profile-img/default-user-profile.svg";
        } else {
            let profilePic = user.userType === 'customer' ?
                profile.customerProfilePicture : profile.sellerProfilePicture;

            profileImg = isFieldEmpty(profilePic) ?
                "https://static.change.org/profile-img/default-user-profile.svg" :
                profilePic;
            console.log("Here", user.userType);

            sellerAddr = profile.sellerAddress;
        }
        if (user.userType === 'seller') {
            sellerAddress = (
                <div class="card w-75 border border-dark" id="infoCard">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-9">
                                <h5 class="card-title">Your Address:</h5>

                            </div>
                            <h5 class="card-text" style={{ "width": '70%', "padding": '10px 20px' }}>{sellerAddr}</h5>
                            <a href="/editSellerAddress" class="btn btn-dark profilebtn" >Update</a>
                        </div>
                    </div>
                </div>)
        }

        return (
            <div>
                <Navbar />
                {this.state.modal === true ? (<Modal
                    isOpen={this.state.modal}
                    toggle={() => this.showModal()}
                    className="modal-popup"
                    scrollable
                >
                    <ModalHeader toggle={() => this.showModal()} close={closeBtn}>
                        Upload Profile Picture
                            </ModalHeader>
                    <ModalBody className="modal-body">
                        <div>
                            <form onSubmit={() => this.uploadFile()}>
                                <div className="form-group row">
                                    <label className="img-form-label">
                                        Upload File:
                      </label>
                                    <div className="col-sm-5">
                                        <input
                                            type="file"
                                            required
                                            onChange={this.handleUpload}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row text-center">
                                    <div className="col-sm-5">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{ marginTop: "2em" }}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>) : null}

                <div className="container" id="userInfo">
                    <h1>
                        Login &amp; Security
                    </h1>
                    <div class="card w-75 border border-dark" id="infoCard">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-9">
                                    <h5 class="card-title">Name:</h5>
                                </div>
                                <h5 class="card-text" style={{ "width": '70%', "padding": '10px 20px' }}>{user.name}</h5>
                                <a href="/editName" class="btn btn-dark profilebtn" >Edit</a>
                            </div>
                        </div>
                    </div>

                    <div class="card w-75 border border-dark" id="infoCard">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-9">
                                    <h5 class="card-title">Email:</h5>
                                </div>
                                <h5 class="card-text" style={{ "width": '70%', "padding": '10px 20px' }}>{user.email}</h5>
                                <a href="/editEmail" class="btn btn-dark profilebtn" >Edit</a>
                            </div>
                        </div>
                    </div>

                    <div class="card w-75 border border-dark" id="infoCard">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-9">
                                    <h5 class="card-title">Profile Image:</h5>

                                </div>
                                <img
                                    className="rounded-circle"
                                    src={profileImg}
                                    alt=""
                                    style={{ "width": '70%', "padding": '10px 50px' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-dark profilebtn"
                                    onClick={() => this.showModal()}
                                >
                                    Update
                                </button>

                            </div>
                        </div>
                    </div>
                    {sellerAddress}
                </div>
            </div>

        )
    }
}
//mapping state to props
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCustomerProfile, getSellerProfile })(userProfile);