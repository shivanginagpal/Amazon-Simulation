import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { updateUserInfo } from '../../actions/authAction';
import { connect } from 'react-redux';
class editEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({email: this.props.auth.user.email});
    }

    onSubmit(e) {
        e.preventDefault();
        const email = {
            email: this.state.email
        }
        this.props.updateUserInfo(email,this.props.history);
    }

    onChange(e) {
        this.setState({ 
          [e.target.name]: e.target.value 
        });
    }

    render() {
        
        return (
            <div>
                <Navbar/>
                <div className="container">
                <div className="col-md-8 m-auto">
                <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group col-md-8">
                <br />
                <h4>Email</h4>
                <div className="row">
                
                <input type="email" 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange} 
                    placeholder="Email" />
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
    auth: state.auth
});

export default connect(mapStateToProps, { updateUserInfo })(editEmail);