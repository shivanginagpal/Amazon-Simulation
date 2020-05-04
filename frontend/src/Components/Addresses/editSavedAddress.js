import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { updateCustomerAddress } from '../../actions/profileAction';
import { isFieldEmpty } from '../SignUp/helperApis';
import TextFieldGroup from '../Common/TextFieldGroup';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class editSavedAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address_id: {},
            fullName: "",
            addrLine1: "",
            addrLine2: "",
            state: "",
            city: "",
            country: "",
            zipCode: "",
            phoneNumber: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state.addr_id);
        if (this.props.location.state.addr_id) {
            axios('/getAddress', {
                method: 'get',
                params: { "addr_id": this.props.location.state.addr_id },
                config: { headers: { 'Content-Type': 'application/json' } }
            })
                .then(res => {
                    console.log(res.data);
                    const address = res.data;

                    const fullName = !isFieldEmpty(address.fullName) ? address.fullName : '';
                    const addrLine1 = !isFieldEmpty(address.addrLine1) ? address.addrLine1 : '';
                    const addrLine2 = !isFieldEmpty(address.addrLine2) ? address.addrLine2 : '';
                    const state = !isFieldEmpty(address.state) ? address.state : '';
                    const city = !isFieldEmpty(address.city) ? address.city : '';
                    const country = !isFieldEmpty(address.country) ? address.country : '';
                    const zipCode = !isFieldEmpty(address.zipCode) ? address.zipCode : '';
                    const phoneNumber = !isFieldEmpty(address.phoneNumber) ? address.phoneNumber : '';

                    this.setState({
                        fullName: fullName,
                        addrLine1: addrLine1,
                        addrLine2: addrLine2,
                        state: state,
                        city: city,
                        country: country,
                        zipCode: zipCode,
                        phoneNumber: phoneNumber,
                        address_id: res.data._id
                    });

                })
                .catch(error => console.log(error.response.data))
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const newAddr = {
            fullName: this.state.fullName,
            addrLine1: this.state.addrLine1,
            addrLine2: this.state.addrLine2,
            state: this.state.state,
            city: this.state.city,
            zipCode: this.state.zipCode,
            country: this.state.country,
            phoneNumber: this.state.phoneNumber,
            addr_id: this.state.address_id
        }

        console.log(newAddr);
        this.props.updateCustomerAddress(newAddr, this.props.history);
    }

    render() {

        const { errors } = this.state;

        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-6 text-center">
                                Add a new Address
                            </h1>
                            <form noValidate onSubmit={this.onSubmit}>
                                <h6>Country</h6>
                                <TextFieldGroup
                                    placeholder="Country"
                                    name="country"
                                    value={this.state.country}
                                    onChange={this.onChange}
                                    error={errors.country}
                                />
                                <h6>Full Name</h6>
                                <TextFieldGroup
                                    placeholder="Full Name"
                                    name="fullName"
                                    value={this.state.fullName}
                                    onChange={this.onChange}
                                    error={errors.fullName}
                                />
                                <h6>Address Line 1</h6>
                                <TextFieldGroup
                                    placeholder="Street Address"
                                    name="addrLine1"
                                    value={this.state.addrLine1}
                                    onChange={this.onChange}
                                    error={errors.addrLine1}
                                />
                                <h6>Address Line 2</h6>
                                <TextFieldGroup
                                    placeholder="House Number/Apt Number"
                                    name="addrLine2"
                                    value={this.state.addrLine2}
                                    onChange={this.onChange}
                                    error={errors.addrLine2}
                                />
                                <h6>State</h6>
                                <TextFieldGroup
                                    placeholder="State"
                                    name="state"
                                    value={this.state.state}
                                    onChange={this.onChange}
                                    error={errors.state}
                                />
                                <h6>City</h6>
                                <TextFieldGroup
                                    placeholder="City"
                                    name="city"
                                    value={this.state.city}
                                    onChange={this.onChange}
                                    error={errors.city}
                                />
                                <h6>Zip Code</h6>
                                <TextFieldGroup
                                    placeholder="Zip Code"
                                    name="zipCode"
                                    value={this.state.zipCode}
                                    onChange={this.onChange}
                                    error={errors.zipCode}
                                />
                                <h6>Phone Number</h6>
                                <TextFieldGroup
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.onChange}
                                    error={errors.phoneNumber}
                                />

                                <input
                                    type="submit"
                                    value="submit"
                                    className="btn btn-dark btn-block mt-8"
                                />
                                <br />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
  });
  
export default connect(mapStateToProps, { updateCustomerAddress })(withRouter(editSavedAddress));