import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { updateCustomerCardInfo } from '../../actions/profileAction';
import { isFieldEmpty } from '../SignUp/helperApis';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class editCardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            cardNumber: "",
            cvv: "",
            expiryMonth: "",
            expiryYear: "",
            card_id:'',
            
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
            card_id: this.state.card_id
        }
        
        this.props.updateCustomerCardInfo(newCard, this.props.history);
        
    }

    componentDidMount() {
        console.log(this.props.location.state.card_id);
        if (this.props.location.state.card_id) {
            axios('/getCardInfo', {
                method: 'get',
                params: { "card_id": this.props.location.state.card_id },
                config: { headers: { 'Content-Type': 'application/json' } }
            })
                .then(res => {
                    console.log(res.data);
                    const card = res.data;

                    const name = !isFieldEmpty(card.name) ? card.name : '';
                    const cardNumber = !isFieldEmpty(card.cardNumber) ? card.cardNumber : '';
                    const cvv = !isFieldEmpty(card.cvv) ? card.cvv : '';
                    const expiryMonth = !isFieldEmpty(card.expiryMonth) ? card.expiryMonth : '' ;
                    const expiryYear = !isFieldEmpty(card.expiryYear) ? card.expiryYear : '';

                    this.setState({
                        name: name,
                        cardNumber: cardNumber,
                        cvv: cvv,
                        expiryMonth: expiryMonth,
                        expiryYear: expiryYear,
                        card_id: res.data._id
                    })
                })
        }    
    }

    render() {
        
        return (
            <div>
                <Navbar/>
                <div className="creditCardForm">
                        <div className="heading">
                            <h1>Add New Card</h1>
                        </div>
                        <div className="payment">
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group owner payment-form-group" >
                                    <label for="name" className="payment-label">Name on Card</label>
                                    <input type="text"
                                        className="form-control payment-form-control"
                                        name="name"
                                        id="owner"
                                        value={this.state.name}
                                        onChange={this.onChange} />
                                </div>

                                <div className="form-group CVV payment-form-group" >
                                    <label for="cvv" className="payment-label">CVV</label>
                                    <input type="text"
                                        className="form-control payment-form-control"
                                        name="cvv"
                                        id="cvv"
                                        value={this.state.cvv}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group payment-form-group" id="card-number-field">
                                    <label for="cardNumber" className="payment-label">Card Number</label>
                                    <input type="text"
                                        className="form-control payment-form-control"
                                        name="cardNumber"
                                        id="cardNumber"
                                        value={this.state.cardNumber}
                                        onChange={this.onChange} />
                                </div>
                                <div className="form-group payment-form-group" id="expiration-date">
                                    <label className="payment-label">Expiration Date</label>
                                    <select className="payment-select"
                                        name="expiryMonth"
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
                                        className="btn btn-dark payment-btn"
                                        value="submit"
                                        id="confirm-purchase">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updateCustomerCardInfo })(withRouter(editCardDetail));
