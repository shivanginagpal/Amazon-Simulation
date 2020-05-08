import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from "axios";
import { hostaddress } from './settings';
import { Link } from "react-router-dom";

 class viewSellerList extends Component {
     constructor(){
         super();
         this.state = {
             sellers: [],
             searchString: ""
         };
         this.searchChangeHandler = this.searchChangeHandler.bind(this);
     }
     searchChangeHandler(e) {
         this.setState({ searchString: e.target.value });
     }
     componentDidMount(){
         axios("/viewSellersList",{
             method: "get"
         }).then(response => {
             this.setState({
                 sellers: this.state.sellers.concat(response.data)
             })
             console.log(this.state.sellers); 
         });
     }
    render() {
        let sellerProfile = this.state.sellers.map(seller => {
            let url = 'http://'+ hostaddress +':3000/viewProductsUnderSeller/' + seller._id + '/' + seller.name
            if(
                seller.name.toUpperCase()
                .includes(this.state.searchString.toUpperCase())
            ){
                return (
                    <tr>
                        <td>{seller.name}</td>
                        <td>
                            <a href={url}
                                className="btn btn-primary btn-sm"
                            >
                                View Products
                            </a>
                        </td>
                    </tr>
                )
            }
        })
        return (
            <div>
                <Navbar/>
                <div className="container" >
                    <div className="dash-header display-4">Seller Profiles</div>
                    <nav class="navbar navbar-light bg-light" id="viewsellersearch">
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
                                
                                {this.state.sellers.length > 0 ? (
                                    <div className="col-10">
                                        <table className="table table-striped table-bordered lead">
                                            <thead>
                                                <tr>
                                                    <th>Seller Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>{sellerProfile}</tbody>
                                        </table>
                                    </div>
                                ) : (
                                        <div>
                                            <h4 style={{ margin: "3em" }}>No sellers to display!</h4>
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

export default viewSellerList;