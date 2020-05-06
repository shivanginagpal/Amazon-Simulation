import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar';
import { updateUserInfo } from '../../actions/authAction';
import { connect } from 'react-redux';

class editName extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({name: this.props.auth.user.name});
    }

    onSubmit(e) {
        e.preventDefault();
        const name = {
            name: this.state.name
        }
        this.props.updateUserInfo(name,this.props.history);
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
                <h4>Name</h4>
                <div className="row">
                
                <input type="text" 
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange} 
                    placeholder="Name" />
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

export default connect(mapStateToProps, { updateUserInfo })(editName);