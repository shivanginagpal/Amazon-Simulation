import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { getCustomerProfile, deleteAddress } from '../../actions/profileAction';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import './address.css';

class savedAddresses extends Component {
    componentDidMount() {
        this.props.getCustomerProfile();
    }

    onDeleteClick(id) {
        this.props.deleteAddress(id);
    }

    editClick = (addr_id) => {
        console.log("Came inside edit-click");
        this.props.history.push({
            pathname: "/editSavedAddress",
            state: {
                addr_id: addr_id
            }
        });
    }

    render() {
        const { profile = [], loading } = this.props.profile;
        console.log(this.props);
        console.log("Profile:")

        let profileContent = null;

        if (profile === null || loading) {
            profileContent = (<div className="container">
                            "No Address Added yet"
                            </div>);
        } else {
            let { savedAddresses } = profile;
            console.log(savedAddresses);
            if (savedAddresses !== null) {
                profileContent = savedAddresses.map((addr) =>
                    <tr key={addr._id} className="list-group-item" id="display-address">
                        <h4>{addr.fullName}</h4>
                        <tr>
                            {addr.addrLine1}, {addr.addrLine2}
                        </tr>
                        <tr>
                            {addr.city}, {addr.state}
                        </tr>
                        <tr>{addr.country} </tr>
                        <tr>Zip Code: {addr.zipCode}</tr>
                        <tr>
                            <button
                                onClick={this.onDeleteClick.bind(this, addr._id)}
                                className="btn btn-danger"
                            >
                                Delete Address
                        </button>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <button
                                onClick={() =>this.editClick(addr._id) }
                                className="btn btn-outline-success"
                            >
                                Edit 
                        </button>
                        </tr>

                    </tr>)
            }
        }

        return (
            <div>
                <Navbar />
                <Link to="/addNewAddress" className="btn btn-light">
                    <i className="fab fa-black-tie text-info mr-1" />
                Add New Address
                </Link>
                <div className="container">
                    {profileContent}
                </div>
            </div>
        )

    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCustomerProfile, deleteAddress })(withRouter(savedAddresses));