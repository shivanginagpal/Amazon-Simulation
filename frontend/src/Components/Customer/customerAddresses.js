import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';

export default class customerAddresses extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div class="a-column a-span4 a-spacing-none a-spacing-top-mini address-column">
                    <a id="ya-myab-address-add-link" class="a-link-normal add-new-address-button" href="/addNewAddress">
                    <div class="a-box first-desktop-address-tile">
                    <div class="a-box-inner a-padding-extra-large">
                    <div id="ya-myab-plus-address-icon" class="a-section a-spacing-none address-plus-icon aok-inline-block"></div>
                    <h2 class="a-color-tertiary">Add Address</h2></div></div></a></div>
                </div>
        )
    }
}
