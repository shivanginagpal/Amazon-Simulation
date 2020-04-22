import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import "./customer.css";

export default class customer extends Component {
    render() {
        return (
            <div>
                <Navbar/>

                <div class="row profile">
                    <div class="col-md ya-card-cell">
                        <a href="https://www.amazon.com/gp/your-account/order-history?ref_=ya_d_c_yo" class="ya-card__whole-card-link">
                          <div data-card-identifier="YourOrders" class="a-box ya-card--rich"><div class="a-box-inner">
                            <div class="a-row">
                              <div class="a-column a-span3">
                                <img alt="Your Orders" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Box._CB485927553_.png"/>
                              </div>
                              <div class="a-column a-span9 a-span-last">
                                <h2 class="a-spacing-none ya-card__heading--rich a-text-normal">
                                  Your Orders
                                </h2>
                                <div><span class="a-color-secondary">Track, return, or buy things again</span></div>
                                
                              </div>
                            </div>
                          </div></div>
                        </a>
                      </div>
                    <br/>
                    
                    <div class="col-md ya-card-cell">
                        <a href="https://www.amazon.com/gp/your-account/order-history?ref_=ya_d_c_yo" class="ya-card__whole-card-link">
                          <div data-card-identifier="YourOrders" class="a-box ya-card--rich"><div class="a-box-inner">
                            <div class="a-row">
                              <div class="a-column a-span3">
                                <img alt="Your Orders" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Box._CB485927553_.png"/>
                              </div>
                              <div class="a-column a-span9 a-span-last">
                                <h2 class="a-spacing-none ya-card__heading--rich a-text-normal">
                                  Your Orders
                                </h2>
                                <div><span class="a-color-secondary">Track, return, or buy things again</span></div>
                                
                              </div>
                            </div>
                          </div></div>
                        </a>
                      </div>
                    <br/>

                    <div class="col-md ya-card-cell">
                        <a href="https://www.amazon.com/gp/your-account/order-history?ref_=ya_d_c_yo" class="ya-card__whole-card-link">
                          <div data-card-identifier="YourOrders" class="a-box ya-card--rich"><div class="a-box-inner">
                            <div class="a-row">
                              <div class="a-column a-span3">
                                <img alt="Your Orders" src="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/cs/ya/images/Box._CB485927553_.png"/>
                              </div>
                              <div class="a-column a-span9 a-span-last">
                                <h2 class="a-spacing-none ya-card__heading--rich a-text-normal">
                                  Your Orders
                                </h2>
                                <div><span class="a-color-secondary">Track, return, or buy things again</span></div>
                                
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