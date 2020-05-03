import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { getSellerProfile,updateSellerAddr } from '../../actions/profileAction';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../Common/TextAreaFieldGroup';
import { isFieldEmpty } from '../SignUp/helperApis';

class editSellerAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerAddr: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getSellerProfile();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            console.log(profile);

            profile.sellerAddress = !isFieldEmpty(profile.sellerAddress) ? profile.sellerAddress : '';


            this.setState({
                sellerAddr: profile.sellerAddress,
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const sellerAddr = {
            address: this.state.sellerAddr
        }
        this.props.updateSellerAddr(sellerAddr, this.props.history);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group col-md-8">
                                <br />
                                <h4>Address</h4>
                                <div className="row">

                                    <TextAreaFieldGroup
                                        name="sellerAddr"
                                        value={this.state.sellerAddr}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button type="submit" class="btn btn-dark">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
//mapping state to props
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getSellerProfile, updateSellerAddr })(editSellerAddress);