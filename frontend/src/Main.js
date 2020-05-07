import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './LandingPage';
import Login from './Components/Login/login';
import Signup from './Components/SignUp/signup';
import SellerHome from './Components/Seller/sellerHome';
import CustomerHome from './Components/Customer/customerHome';
import Customer from './Components/Customer/customer';
import UserProfile from './Components/User/userProfile';
//import CustomerAddresses from './Components/Customer/customerAddresses';
//admin
import adminHome from './Components/Admin/adminHome';
import inventory from './Components/Admin/inventory';
import viewSellerList from './Components/Admin/viewSellerList';
import viewOrdersAdmin from './Components/Admin/viewOrdersAdmin';
import viewProductsUnderCategory from './Components/Admin/viewProductsUnderCategory';
import viewProductsUnderSeller from './Components/Admin/viewProductsUnderSeller';
//Products
import AddProduct from './Components/Products/AddProduct';
import EditName from './Components/User/editName';
import EditEmail from './Components/User/editEmail';
import SellerOptions from './Components/Seller/sellerOptions';
import AddNewAddress from './Components/Addresses/addNewAddress';
import PaymentInfo from './Components/PaymentOptions/paymentInfo';
import SavedAddresses from './Components/Addresses/savedAddresses';
import EditSellerAddress from './Components/User/editSellerAddress';
import SellerProfile from './Components/Seller/sellerProfile';
import CustomerProfile from './Components/Customer/customerProfile';
import EditSavedAddress from './Components/Addresses/editSavedAddress';
import EditCardDetail from './Components/PaymentOptions/editCardDetail';
import AddNewCard from './Components/PaymentOptions/addNewCard';
import ProductSearch from './Components/Products/productSearch';
import ProductPage from './Components/Products/ProductPage';
import sellerProductPage from './Components/Products/SellerProductPage';
import editProduct from './Components/Products/EditProduct';
import UpdateProductImages from './Components/Products/UpdateProductImages';
//Cart
import Cart from './Components/Cart/Cart';
//CheckOut
import Checkout from './Components/Cart/Checkout';
//Orders
import OrderSummary from './Components/Order/OrderSummary';
import CustomerOrders from './Components/Order/CustomerOrders';
import CancelledOrders from './Components/Order/CancelledOrders';
import OrderView from './Components/Order/OrderView';


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
                    <Route path="/userProfile" component={UserProfile}/>
                    <Route path="/adminHome" component={adminHome} />
                    <Route path="/inventory" component={inventory} />
                    <Route path="/viewSellerList" component={viewSellerList} />       
                    <Route path="/addProduct" component={AddProduct} />
                    <Route path="/editName" component={EditName}/>
                    <Route path="/editEmail" component={EditEmail}/>
                    <Route path="/sellerOptions" component={SellerOptions}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/addNewAddress" component={AddNewAddress}/>
                    <Route path="/paymentInfo" component={PaymentInfo}/>
                    <Route path="/savedAddresses" component={SavedAddresses}/>
                    <Route path="/viewOrdersAdmin" component={viewOrdersAdmin}/>
                    <Route path="/viewProductsUnderCategory/:category" component={viewProductsUnderCategory} />
                    <Route path="/viewProductsUnderSeller/:id" component={viewProductsUnderSeller} />
                    <Route path="/editSellerAddress" component={EditSellerAddress}/>
                    <Route path="/sellerProfile/:seller" component={SellerProfile}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/customerProfile" component={CustomerProfile}/>
                    <Route path="/EditSavedAddress" component={EditSavedAddress}/>
                    <Route path="/EditCardDetail" component={EditCardDetail}/>
                    <Route path="/AddNewCard" component={AddNewCard}/>
                    <Route path='/productSearch' component={ProductSearch}/>
                    <Route path='/productPage/:id' component={ProductPage}/>
                    <Route path='/orderSummary/:id' component={OrderSummary}/>
                    <Route path='/viewOrder/:id' component={OrderView}/>
                    <Route path='/customerOrders' component={CustomerOrders}/>
                    <Route path='/cancelledOrders' component={CancelledOrders}/>
                    <Route path='/sellerProductPage/:id' component={sellerProductPage}/>
                    <Route path='/editProduct' component={editProduct}/>
                    <Route path='/updateProductImages' component={UpdateProductImages}/>
                </div>
        )
    }
}

export default Main;