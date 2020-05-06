import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { connect } from 'react-redux';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : null
        };    
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
    }

    render() {
        let orderId = localStorage.getItem('orderId');
        localStorage.removeItem('orderId');
        return (
            <div>
                <Navbar />
                <br />
                <br />
                <div className="container" id= "movecenter">
                    <div className="row">
                        <div className="col-md-12" >
                            ORDER SUMMARY PAGE!
                            <br/>
                            {orderId}
                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
    }
}

function mapDispatchToProps (dispatch)
{
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);