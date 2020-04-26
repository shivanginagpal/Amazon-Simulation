import React, { Component } from 'react';
import { addCustomerNewCard } from '../../actions/profileAction';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import './payment.css';

class addNewCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cardNumber: "",
            cvv: "",
            expiryMonth: "",
            expiryYear: "",
            newCardAdded: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newCard = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            cvv: this.state.cvv,
            expiryMonth: this.state.expiryMonth,
            expiryYear: this.state.expiryYear,
        }
        console.log(newCard);
        this.props.addCustomerNewCard(newCard, this.props.history);
        this.setState({newCardAdded:true});
    }

    render() {

        const { errors } = this.state;
        return (
            <div>

                <div id="collapseFour" className="collapse">
                    <div className="creditCardForm">
                        <div className="heading">
                            <h1>Add New Card</h1>
                        </div>
                        <div className="payment">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group owner">
                                    <label for="name">Name on Card</label>
                                    <input type="text"
                                        className="form-control"
                                        name="name"
                                        id="owner"
                                        value={this.state.name}
                                        onChange={this.onChange} />
                                </div>

                                <div className="form-group CVV">
                                    <label for="cvv">CVV</label>
                                    <input type="text"
                                        className="form-control"
                                        name="cvv"
                                        id="cvv"
                                        value={this.state.cvv}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group" id="card-number-field">
                                    <label for="cardNumber">Card Number</label>
                                    <input type="text"
                                        className="form-control"
                                        name="cardNumber"
                                        id="cardNumber"
                                        value={this.state.cardNumber}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group" id="expiration-date">
                                    <label>Expiration Date</label>
                                    <select name="expiryMonth"
                                        value={this.state.expiryMonth}
                                        onChange={this.onChange}>
                                        <option>Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February </option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    <select name="expiryYear"
                                        value={this.state.expiryYear}
                                        onChange={this.onChange}>
                                        <option> Year</option>
                                        <option value="2020"> 2020</option>
                                        <option value="2021"> 2021</option>
                                        <option value="2022"> 2022</option>
                                        <option value="2023"> 2023</option>
                                        <option value="2024"> 2024</option>
                                        <option value="2025"> 2025</option>
                                    </select>
                                </div>
                                <div className="form-group" id="pay-now">
                                    <button type="submit"
                                        className="btn btn-dark"
                                        value="submit"
                                        id="confirm-purchase">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { addCustomerNewCard })(withRouter(addNewCard));