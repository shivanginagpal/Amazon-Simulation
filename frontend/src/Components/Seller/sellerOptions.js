import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import './seller.css';

export default class sellerOptions extends Component {
    render() {
        return (
            <div className="bgimg">
                <Navbar/>

                <div class="row profile">
                    <div class="col-md ya-card-cell">
                        <a href="#" class="ya-card__whole-card-link">
                          <div data-card-identifier="YourOrders" class="a-box ya-card--rich"><div class="a-box-inner">
                            <div class="a-row">
                              <div class="a-column a-span3">
                                <img alt="Your Orders" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Box._CB485927553_.png"/>
                              </div>
                              <div class="a-column a-span9 a-span-last">
                                <h2 class="a-spacing-none ya-card__heading--rich a-text-normal">
                                  Your Received Orders
                                </h2>
                                <div><span class="a-color-secondary">Track, Cancel or Ship Orders</span></div>
                                
                              </div>
                            </div>
                          </div></div>
                        </a>
                      </div>
                    <br/>
        
                    <div class="col-md ya-card-cell">
                        <a href="/userProfile" class="ya-card__whole-card-link">
                          <div data-card-identifier="SignInAndSecurity" class="a-box ya-card--rich"><div class="a-box-inner">
                            <div class="a-row">
                              <div class="a-column a-span3">
                                <img alt="Login &amp; security" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/sign-in-lock._CB485931485_.png"/>
                              </div>
                              <div class="a-column a-span9 a-span-last">
                                <h2 class="a-spacing-none ya-card__heading--rich a-text-normal">
                                Login &amp; security
                                </h2>
                                <div><span class="a-color-secondary">Edit email, name or profile picture</span></div>
                                
                              </div>
                            </div>
                          </div></div>
                        </a>
                      </div>
                    <br/>
                    
                </div> 
            </div>
        )
    }
}