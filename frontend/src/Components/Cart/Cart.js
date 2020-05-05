import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import './cart.css';
import {getCart, deleteCartItem, saveForLater, changeQuantity} from '../../actions/cartAction';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartDetails : null
        };
        this.deleteItem=this.deleteItem.bind(this);
        this.saveForLater=this.saveForLater.bind(this);
        this.changeQuantity=this.changeQuantity.bind(this);
    }

    handleChange = e => {
        this.setState({ ...this.state, [e.target.name] : e.target.value} );
    }

    deleteItem = item => event =>{
        event.preventDefault();
        let payload = {
            "itemId" : item.itemId,
            "email" : this.state.cartDetails.data.customerEmail,
            "totalAmount" : this.state.cartDetails.data.totalAmount - item.totalPrice
        }
        this.props.deleteCartItem(payload);
    }

    saveForLater = item => event =>{
        event.preventDefault();
        let payload = {
            "itemId" : item.itemId,
            "email" : this.state.cartDetails.data.customerEmail,
            "cartStatus" : "SAVED_FOR_LATER",
            "totalAmount" : this.state.cartDetails.data.totalAmount - item.totalPrice
        }
        this.props.saveForLater(payload);
    }

    changeQuantity = (item) => event => {
        event.preventDefault();
        let payload = {
            "itemId" : item.itemId,
            "email" : this.state.cartDetails.data.customerEmail,
            "totalPrice" : event.target.value*item.productPrice,
            "productQuantity" : event.target.value,
            "totalAmount" : this.state.cartDetails.data.totalAmount - item.totalPrice + event.target.value*item.productPrice
        }
        this.props.changeQuantity(payload);
    }

    fetchCartItems(){
        this.props.getCart();
    }

    componentDidMount(){
        this.fetchCartItems();
    }

    componentWillReceiveProps(nextProps){
        //alert(JSON.stringify(nextProps.cartItems));
        this.setState({
          ...this.state,
          cartDetails : !nextProps.updatedCartItems ? (!nextProps.cartItems ? this.state.cartDetails : nextProps.cartItems) : nextProps.updatedCartItems ,  
        }
       );	
    }

    render() {
        let cartResult = "";
        if(this.state.cartDetails && this.state.cartDetails.status){
        cartResult = this.state.cartDetails.data.products.map((item,key)=>
            <div class="card" style={{width: "60rem", "backgroundColor" : "#ffff"}}>
                <div class="card-body">
                    <h5 class="card-title" >{item.productName}</h5>
                    <div className="row">
                        <div className="col-md-3">
                            <b>Seller :</b> {item.sellerName}
                        </div>
                        <div className="col-md-3" id= "movecenter">
                            Unit Price : {item.productPrice}
                        </div>
                        <div className="col-md-3" id= "movecenter">
                            <div className="form-group">
                                <select value={item.productQuantity} onChange={this.changeQuantity(item)}>
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                </select>
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#" onClick={this.deleteItem(item)}>Delete</a>
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#" onClick={this.saveForLater(item)}>Save for later</a>
                            </div>
                        </div>
                        <div className="col-md-3" id= "movecenter" style={{color: "#DC143C", fontWeight: "bold"}}>
                            Price : {item.totalPrice}
                        </div>
                    </div>
                </div>
            </div>
        );
        }
        else{
            cartResult = <div style={{color: "#DC143C", fontWeight: "bold", fontSize: "16px"}}><h5>No items in cart!</h5></div>
        }
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <div className="container" id= "movecenter">
                    <div className="row">
                        <div className="col-md-12" >
                            <br/><h3>Shopping Cart</h3><br/>
                            {cartResult}
                            <br/>
                            {this.state.cartDetails && this.state.cartDetails.status &&
                                <div style={{color: "#DC143C", fontWeight: "bold", fontSize: "16px"}}>
                                    <div className="row">
                                        <div className="col-sm" style={{textAlign: "right"}}>
                                        Total Price : {this.state.cartDetails.data.totalAmount}
                                        </div>
                                        <div className="col-sm" >
                                        <Link to={{pathname: "/checkout"}} class="btn btn-success">Proceed to checkOut</Link>
                                        </div>
                                    </div>
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
       updatedCartItems: state.cartReducer.updatedCartItems
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getCart: data => dispatch(getCart(data)),
        deleteCartItem: data => dispatch(deleteCartItem(data)),
        saveForLater: data => dispatch(saveForLater(data)),
        changeQuantity: data => dispatch(changeQuantity(data)),
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);