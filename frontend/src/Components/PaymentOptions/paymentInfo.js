import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import './payment.css';
import AddNewCard from './addNewCard';
import { getCustomerProfile, deleteCard } from '../../actions/profileAction';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class paymentInfo extends Component {
    componentDidMount() {
        this.props.getCustomerProfile();
    }

    onDeleteClick(id) {
        this.props.deleteCard(id);
    }

    render() {
        const { profile = [], loading } = this.props.profile;
        console.log(this.props);
        console.log("Profile:")

        let profileContent = null;

        if (profile === null || loading) {
            profileContent = ("Profile Loading");
        } else {
            let { paymentOptions } = profile;
            console.log(paymentOptions);
            if (paymentOptions !== null) {
                profileContent = paymentOptions.map((card) =>
                    <tr key={card._id} className="list-group-item" id="display-card">
                        <h4>{card.name}</h4>
                        <tr>
                            <strong>Card Number:</strong>{card.cardNumber}
                        </tr>
                        <td>
                            <strong>Expiry Month:</strong> {card.expiryMonth}
                        </td>
                        <td>
                            <strong>Expiry Year:</strong> {card.expiryYear}
                        </td>
                        <tr>
                        <button
                            onClick={this.onDeleteClick.bind(this, card._id)}
                            className="btn btn-danger"
                        >
                            Delete Card
                        </button>
                        </tr>

                    </tr>)
            }
        }

        return (
            <div>
                <Navbar />
                <div className="container">
                    <button className="collapsed" data-toggle="collapse" href="#collapseFour" id="add-new-card">Add New Card</button>
                    <AddNewCard />
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

export default connect(mapStateToProps, { getCustomerProfile, deleteCard })(withRouter(paymentInfo));