import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import './cart.css';
import '../PaymentOptions/payment.css';
import {getCart, addPaymentOption} from '../../actions/cartAction';
import {placeOrder} from '../../actions/orderAction';
import EdiText from 'react-editext';
import { getCustomerProfile } from '../../actions/profileAction';
import {getID, getEmail} from '../SignUp/helperApis';


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartDetails : null,
            customerData : null
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.newPaymentOption = this.newPaymentOption.bind(this);        
    }

    fetchCartItems(){
        this.props.getCart();
    }

    changeHandler = (e) => {
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value,
          });
        
    }

    handleSave = val => {
        this.setState({
            ...this.state,
            addressId : val,
            });
    }

    newPaymentOption = (e) => {
        e.preventDefault();
        const newCard = {
            name: this.state.name,
            cardNumber: this.state.cardNumber,
            cvv: this.state.cvv,
            expiryMonth: this.state.expiryMonth,
            expiryYear: this.state.expiryYear,
        }
        this.props.addPaymentOption(newCard);
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.addressId==null || this.state.addressId==="default")
        {
            alert("Please select a valid delivery address");
        }
        else if(this.state.paymentId==null || this.state.paymentId==="default")
        {
            alert("Please select a valid payment method");
        }
        else
        {
            let productList = [];
            let product = {};
            this.state.cartDetails.data.products.map((prd,key)=> {
                product = {
                    productId: prd.productId,
                    productName: prd.productName,
                    productPrice: prd.productPrice,
                    productQuantity: prd.productQuantity,
                    productSellerId: prd.sellerId,
                    productSellerName: prd.sellerName,
                    productOrderStatus: "NEW"
                };
                productList.push(product);
            });
            let order = {
                customerId : getID(),
                customerEmail : getEmail(),
                customerName : this.state.cartDetails.data.customerName,
                products : productList,
                subTotal : this.state.cartDetails.data.totalAmount,
                tax : 0.07*this.state.cartDetails.data.totalAmount,
                totalAmount: this.state.cartDetails.data.totalAmount+(0.07*this.state.cartDetails.data.totalAmount),
                deliveryAddress: this.state.addressId,
                paymentInfo: this.state.paymentId
            };
            this.props.placeOrder(order)
        }
    }


    componentDidMount(){
        this.fetchCartItems();
        this.props.getCustomerProfile();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          cartDetails : !nextProps.cartItems ? this.state.cartDetails : nextProps.cartItems,
          customerData : !nextProps.profile ? this.state.customerData : nextProps.profile
        }
       );	
    }

    render() {
        let redirectVar = null;
        if (this.props.orderStatus) {
            //localStorage.setItem("orderId", this.props.orderId);
            let pathRoute = "/orderSummary/"+this.props.orderId;
            redirectVar = <Redirect to={pathRoute} />
        }
        let cartResult = "";
        if(this.state.cartDetails && this.state.cartDetails.status){
        cartResult = this.state.cartDetails.data.products.map((item,key)=>
            <div class="card" style={{width: "60rem", "backgroundColor" : "#ffff"}}>
                <div class="card-body">
                    <h5 class="card-title" >{item.productName}</h5>
                    <div className="row">
                        <div className="col-md">
                            <b>Seller :</b> {item.sellerName}
                        </div>
                        <div className="col-md" id= "movecenter">
                            Unit Price : ${item.productPrice}
                        </div>
                        <div className="col-md" id= "movecenter">
                            Quantity : {item.productQuantity}
                        </div>
                        <div className="col-md" id= "movecenter" style={{color: "#DC143C", fontWeight: "bold"}}>
                            Price : ${item.totalPrice}
                        </div>
                    </div>
                </div>
            </div>
        );
        }

        let addressList = "";
        if (this.state.customerData !== null && this.state.customerData.savedAddresses !== null) {
            addressList = this.state.customerData.savedAddresses.map((addr) => 
            <option value={addr.fullName + ", "+addr.addrLine1+ ", "+addr.city+ ", "+addr.state+ ", "+addr.zipCode}>{addr.fullName + ", "+addr.addrLine1+ ", "+addr.city+ ", "+addr.state+ ", "+addr.zipCode}</option>         
            );
        }
        let paymentsList = "";
        if (this.state.customerData !== null && this.state.customerData.paymentOptions !== null) {
            paymentsList = this.state.customerData.paymentOptions.map((paymentOption) => 
            <option value={paymentOption.name+ ", ****-"+paymentOption.cardNumber.slice(-4) + ", "+paymentOption.expiryMonth+"/"+paymentOption.expiryYear}>{paymentOption.name+ ", ****-"+paymentOption.cardNumber.slice(-4) + ", "+paymentOption.expiryMonth+"/"+paymentOption.expiryYear}</option>         
            );
        }
        return (
            <div>
                <Navbar />
                <br />
                <br />
                {redirectVar}
                <div className="container" id= "movecenter">
                    <div className="row">
                        <div className="col-md-12" >
                            <br/><h3 style={{color: "#0D865D", fontWeight: "bold"}}>Checkout</h3><br/>
                            <h4>Product Details:</h4>
                                {cartResult}
                                <br/>
                                {this.state.cartDetails && this.state.cartDetails.status &&
                                    <div>
                                        <div className="row panel panel-body border-bottom border-dark">
                                            <div className="col-sm" style={{color: "#DC143C", fontWeight: "bold", fontSize: "16px", textAlign: "right"}}>
                                                <span style={{paddingRight: "($spacer * .5)"}}>Total Price : ${this.state.cartDetails.data.totalAmount}</span>
                                            </div><br/><br/>
                                        </div><br/><br/>
                                        <div className="row panel panel-body border-bottom border-dark">
                                            <div className="col-md"><h4>Delivery Address:</h4></div>
                                            <div className="col-md">
                                                <h6>Choose Saved Address: </h6>
                                                <select onChange = {this.changeHandler} name="addressId">
                                                    <option value="default">Select</option>
                                                    {addressList}
                                                </select><br/><br/>
                                            </div>
                                            <div className="col-md">
                                                <h6>Add New Delivery Address: </h6>
                                                <EdiText
                                                    type='text'
                                                    value={"Add new delivery address here"}
                                                    onSave={this.handleSave}
                                                /><br/>
                                            </div>
                                        </div><br/><br/>
                                        <div className="row panel panel-body border-bottom border-dark">
                                            <div className="col-md">
                                                <h4>Payment Method: </h4>
                                            </div>
                                            <div className="col-md">
                                                <h6>Choose Payment Option: </h6>
                                                <select onChange = {this.changeHandler} name="paymentId">
                                                    <option value="default">Select</option>
                                                    {paymentsList}
                                                </select>
                                            </div>
                                            <div className="col-md">
                                                <h6>Add New Payment Method: </h6>
                                                <form onSubmit={this.newPaymentOption}>
                                                    <div className="form-group owner payment-form-group" >
                                                        <label for="name" className="payment-label">Name on Card</label>
                                                        <input type="text"
                                                            className="form-control payment-form-control"
                                                            name="name"
                                                            id="owner"
                                                            value={this.state.name}
                                                            onChange={this.changeHandler} />
                                                    </div>

                                                    <div className="form-group CVV payment-form-group" >
                                                        <label for="cvv" className="payment-label">CVV</label>
                                                        <input type="text"
                                                            className="form-control payment-form-control"
                                                            name="cvv"
                                                            id="cvv"
                                                            value={this.state.cvv}
                                                            onChange={this.changeHandler} />
                                                    </div>
                                                    <div className="form-group payment-form-group" id="card-number-field">
                                                        <label for="cardNumber" className="payment-label">Card Number</label>
                                                        <input type="text"
                                                            className="form-control payment-form-control"
                                                            name="cardNumber"
                                                            id="cardNumber"
                                                            value={this.state.cardNumber}
                                                            onChange={this.changeHandler} />
                                                    </div>
                                                    <div className="form-group payment-form-group" id="expiration-date">
                                                        <label className="payment-label">Expiration Date</label>
                                                        <select className="payment-select"
                                                            name="expiryMonth"
                                                            value={this.state.expiryMonth}
                                                            onChange={this.changeHandler}>
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
                                                            onChange={this.changeHandler}>
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
                                                            id="confirm-purchase">Add Payment Method</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div><br/>
                                        <div className="row panel panel-body">
                                            <div className="col-sm" id="movecenter" >
                                                <button className="btn btn-success" onClick={this.handleSubmit}>Place Order</button>
                                            </div>
                                            <div className="col-sm" id="movecenter">
                                                <Link to={{pathname: "/cart"}} class="btn btn-danger">Cancel</Link>
                                            </div>
                                        </div>
                                        <br/><br/><br/><br/>
                                    </div>
                                }
                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
       cartItems: state.cartReducer.cartItems,
       profile: state.profile.profile,
       orderStatus : state.orderReducer.status,
       orderId : state.orderReducer.orderId
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getCart: data => dispatch(getCart(data)),
        getCustomerProfile : data => dispatch(getCustomerProfile(data)),
        addPaymentOption : data => dispatch(addPaymentOption(data)),
        placeOrder : data => dispatch(placeOrder(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);