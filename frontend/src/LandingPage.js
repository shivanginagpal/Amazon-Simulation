import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Components/Navbar/Navbar';
import Slideshow from './slideshow';
import CustomerHome from './Components/Customer/customerHome';
import SellerHome from './Components/Seller/sellerHome';
import './LandingPage.css';

class LandingPage extends Component {
    render(){
        let currentHome;
        const { isAuthenticated, user } = this.props.auth;

        if (isAuthenticated){
            currentHome = (user.userType==='customer')? <CustomerHome /> : <SellerHome />
        }else{
            currentHome = (<div>
                <Navbar/>
                <br/>
                <br/>
                <div>
                    <Slideshow />
                </div>
                </div>);
        }
        return (
            <div>
                    {currentHome}
            </div>
        );
    }
}
LandingPage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(LandingPage);