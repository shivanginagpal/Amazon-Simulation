import React, { Component } from 'react';
import axios from "axios";
import { getID } from "../SignUp/helperApis";



 class SellerStatistics extends Component {
     constructor(props) {
         super(props);
         this.state = {
             statistics: [],
             searchString: ""
         };
         this.searchChangeHandler = this.searchChangeHandler.bind(this);
     }
     searchChangeHandler(e) {
         this.setState({ searchString: e.target.value });
     }
    componentDidMount = () => {
        const sellerId = getID();
        const data = {
            id:sellerId
        }
        axios("/sellerStatistics",{
            method:'put',
            data:data
        })
        .then(res => {
            this.setState({
                statistics:res.data
            })
        })
    } 

    render() {
        let sellerStatistics;
        if(this.state.statistics != null){
            sellerStatistics = this.state.statistics.map(product => {
               if(product._id.toUpperCase()
               .includes(this.state.searchString.toUpperCase())){
                   return (
                       <tr>
                           <td>{product._id}</td>
                            <td>{product.quantity}</td>
                            <td>{product.totalAmount}</td>
                       </tr>
                   )
               }

            })

        }
        return (
            <div>
                <div className="container" >
                    <nav class="navbar navbar-light bg-light">
                        <form class="form-inline">
                            <input
                                class="form-control mr-sm-2"
                                type="search"
                                onChange={this.searchChangeHandler}
                                value={this.state.searchString}
                                placeholder="Search"
                                aria-label="Search"
                            />

                        </form>
                    </nav>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12">
                            <div className="dash-one">
                                
                                {this.state.statistics.length > 0 ? (
                                    <div className="col-10">
                                        <table className="table table-striped table-bordered lead">
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Total Quantity Sold</th>
                                                    <th>Total Amount Earned</th>
                                                </tr>
                                            </thead>
                                            <tbody>{sellerStatistics}</tbody>
                                        </table>
                                    </div>
                                ) : (
                                        <div>
                                            <h4 style={{ margin: "3em" }}>No statistics to display!</h4>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        )
    }
}

export default SellerStatistics;