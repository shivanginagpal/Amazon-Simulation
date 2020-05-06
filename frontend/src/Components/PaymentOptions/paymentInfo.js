import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import './payment.css';
import { getCustomerProfile, deleteCard } from '../../actions/profileAction';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class paymentInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
        profile: null,
        }
    }
    componentDidMount() {
        this.props.getCustomerProfile();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.profile) {
            console.log("received error");
            this.setState({ profile: nextProps.profile })
        }
    }

    onDeleteClick(id) {
        this.props.deleteCard(id);
    }

    editClick = (card_id) => {
        console.log("Came inside edit-click");
        this.props.history.push({
            pathname: "/editCardDetail",
            state: {
                card_id: card_id
            }
        });
    }

    render() {
        // const { profile = [], loading } = this.props.profile;
        // console.log(this.props);
        // console.log("Profile:")

        const {profile} = this.state;

        let profileContent = null;

        if (profile === null ) {
            profileContent = ("Profile Loading");
        } else {
            let { paymentOptions } = profile;
            console.log(paymentOptions);
            if (paymentOptions !== null) {
                profileContent = paymentOptions.map((card) =>
                    <tr key={card._id} className="list-group-item" id="display-card">
                        <h4>{card.name}</h4>
                        <tr>
                            <strong>Card Number:</strong>{" Ending in "+card.cardNumber.slice(-4)}
                        </tr>
                        <td>
                            <strong>Expiry Month:</strong> {card.expiryMonth}
                        </td>
                        <td>
                            <strong>Expiry Year:</strong> {card.expiryYear}
                        </td>
                        <tr>
                            <td>
                        <button
                            onClick={this.onDeleteClick.bind(this, card._id)}
                            className="btn btn-danger"
                        >
                            Delete Card
                        </button>
                        </td>

                        {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp;  */}
                        <td>
                        <button
                                onClick={() =>this.editClick(card._id) }
                                className="btn btn-outline-success"
                            >
                                Edit 
                        </button>
                        </td>
                        </tr>

                    </tr>)
            }
        }

        return (
            <div>
                <Navbar />
                <div className="container">
                    <br />
                <Link to="/addNewCard" className="btn btn-primary" id="add-new-card">
                    Add New Card
                </Link>
                
                {profileContent}
                </div>
            </div>
        )

    }
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile.profile
});

export default connect(mapStateToProps, { getCustomerProfile, deleteCard })(withRouter(paymentInfo));