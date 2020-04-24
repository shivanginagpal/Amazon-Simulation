import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './LandingPage';
import Login from './Components/Login/login';
import Signup from './Components/SignUp/signup';
import SellerHome from './Components/Seller/sellerHome';
import CustomerHome from './Components/Customer/customerHome';
import Customer from './Components/Customer/customer';
import CustomerProfile from './Components/Customer/customerProfile';
import CustomerAddresses from './Components/Customer/customerAddresses';
import adminHome from './Components/Admin/adminHome';
import inventory from './Components/Admin/inventory';
//Products
import AddProduct from './Components/Products/AddProduct';

class Main extends Component {
    render() {
        return (
                <div> 
                    <Route exact path="/" component={Home}/> 
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/sellerHome" component={SellerHome}/>
                    <Route path="/customerHome" component={CustomerHome}/>
                    <Route path="/customer" component={Customer}/>
                    <Route path="/customerProfile" component={CustomerProfile}/>
                    <Route path="/customerAddresses" component={CustomerAddresses}/>
                    <Route path="/adminHome" component={adminHome} />
                    <Route path="/inventory" component={inventory} />
                    <Route path="/addProduct" component={AddProduct} />
                </div>
        )
    }
}

export default Main;