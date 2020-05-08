import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';
import EdiText from 'react-editext';
import './cart.css';
import {getCart, deleteCartItem, saveForLater, changeQuantity, updateGift, updateGiftMessage} from '../../actions/cartAction';
import SaveForLater from '../Cart/SaveForLater';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartDetails : null,
            msg: ""
        };
        this.deleteItem=this.deleteItem.bind(this);
        this.saveForLater=this.saveForLater.bind(this);
        this.changeQuantity=this.changeQuantity.bind(this);
        this.checkGift=this.checkGift.bind(this);
        this.handleSave=this.handleSave.bind(this);
        this.saveMsg=this.saveMsg.bind(this);
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

    saveMsg = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            msg : e.target.value
        })
    }

    handleSave =  item => e => {
        e.preventDefault();
        let payload = {
                "itemId" : item.itemId,
                "email" : this.state.cartDetails.data.customerEmail,
                "giftMessage" : this.state.msg
            }
        this.props.updateGiftMessage(payload);
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


   
    checkGift = (item) => event => {
        event.preventDefault();
        let payload = {};
        if(!event.target.checked){
         payload = {
            "itemId" : item.itemId,
            "email" : this.state.cartDetails.data.customerEmail,
            "totalPrice" :   item.totalPrice - 2*item.productQuantity,
            "totalAmount" : this.state.cartDetails.data.totalAmount  - 2*item.productQuantity,
            "gift" : false
        }
        }
        else{
             payload = {
                "itemId" : item.itemId,
                "email" : this.state.cartDetails.data.customerEmail,
                "totalPrice" : 2*item.productQuantity + item.totalPrice,
                "totalAmount" : this.state.cartDetails.data.totalAmount  + 2*item.productQuantity,
                "gift": true
            }
        }
        this.props.updateGift(payload);
    }

    fetchCartItems(){
        this.props.getCart();
    }

    componentDidMount(){
        this.fetchCartItems();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          cartDetails : !nextProps.updatedCartItems ? (!nextProps.cartItems ? this.state.cartDetails : nextProps.cartItems) : nextProps.updatedCartItems ,  
        }
       );	
    }

    render() {
        let cartResult = "";
        if(this.state.cartDetails && this.state.cartDetails.status && Object.keys(this.state.cartDetails.data.products).length!==0){
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
                            <div className="form-group">
                                <select value={item.productQuantity} onChange={this.changeQuantity(item)}>
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                    <option value="6" >6</option>
                                    <option value="7" >7</option>
                                    <option value="8" >8</option>
                                    <option value="9" >9</option>
                                    <option value="10" >10</option>
                                </select>
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#" onClick={this.deleteItem(item)}>Delete</a>
                                <i class="a-icon a-icon-text-separator sc-action-separator" role="img" aria-label="|"></i>
                                <a href="#" onClick={this.saveForLater(item)}>Save for later</a>
                            </div>
                        </div>
                        <div className="col-md" id= "movecenter" style={{color: "#DC143C", fontWeight: "bold"}}>
                            Price : ${item.totalPrice}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3" style={{marginLeft : "20px"}}>
                            <input type="checkbox" class="form-check-input" checked={item.gift} onChange={this.checkGift(item)}/>
                            <span>make gift</span>
                        </div>
                    </div>
                    <div className="row">
                    {item.gift &&
                        <div className="col-md-6" style={{marginLeft : "20px"}}>
                            {item.giftMessage}
                            <input type="text" placeholder="add/edit gift message here" onChange={this.saveMsg.bind(this)}/>
                            <a href="#" onClick={this.handleSave(item)}>save</a>
                        </div>
                    }
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
                            {this.state.cartDetails && this.state.cartDetails.status && Object.keys(this.state.cartDetails.data.products).length!==0 &&
                                <div style={{color: "#DC143C", fontWeight: "bold", fontSize: "16px"}}>
                                    <div className="row">
                                        <div className="col-sm" style={{textAlign: "right"}}>
                                        Total Price : ${this.state.cartDetails.data.totalAmount}
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
                <SaveForLater/>
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
        updateGift: data => dispatch(updateGift(data)),
        updateGiftMessage: data => dispatch(updateGiftMessage(data))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);