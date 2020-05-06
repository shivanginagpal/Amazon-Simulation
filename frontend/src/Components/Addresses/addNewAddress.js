import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import TextFieldGroup from '../Common/TextFieldGroup';
import { addCustomerNewAddress } from '../../actions/profileAction';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class addNewAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      fullName: "",
      addrLine1: "",
      addrLine2: "",
      state: "",
      city: "",
      zipCode: "",
      phoneNumber: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("in componentWillReceiveProps");
    if (nextProps.errors) {
        console.log("received error");
        this.setState({ errors: nextProps.errors })
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
      country: this.state.country,
      fullName: this.state.fullName,
      addrLine1: this.state.addrLine1,
      addrLine2: this.state.addrLine2,
      state: this.state.state,
      city: this.state.city,
      zipCode: this.state.zipCode,
      phoneNumber: this.state.phoneNumber
    }
    console.log(newAddr);
    this.props.addCustomerNewAddress(newAddr, this.props.history);
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
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addCustomerNewAddress })(withRouter(addNewAddress));