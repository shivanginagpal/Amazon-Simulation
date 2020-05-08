import React, { Component } from 'react';
import Navbar from './adminNavbar';
import axios from 'axios';
import product_image from "../../images/adminproduct.jpg";
import { Bar } from 'react-chartjs-2';
import { isFieldEmpty } from '../SignUp/helperApis';
import './admin.css';

 class viewProductsUnderSeller extends Component {
     constructor() {
         super()
         this.state = {
             productdetails: [],
             currentPage: 1,
             months: [],
             count: []
         }
         //this.onSubmit = this.onSubmit.bind(this);
     };

     componentDidMount = () => {
         const sellerid = this.props.match.params.id;
         const data = {
             id: sellerid,
             currentPage: this.state.currentPage
         }

         
         axios("/viewProductsUnderSeller", {
             method: 'put',
             data: data
         }).then(res => {
             this.setState({
                 productdetails: res.data
             })
             console.log("This is p", this.state.productdetails);
         })


         axios("/monthlySellerAmount", {
             method: 'put',
             data: data
         })
             .then((response) => {
                 console.log("THIS IS RESPONSE", response);
                 let monthsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     monthsArr.push(item._id);
                     valArr.push(item.totalAmount)
                 });
                 this.setState({
                     months: monthsArr,
                     count: valArr
                 });
             })

        
     }

     nextPage = async (e) => {
         let page = this.state.currentPage;
         page += 1;
         this.setState({ currentPage: page }, () => {
             this.onSubmit();
         });
     }

     prevPage = async (e) => {
         let page = this.state.currentPage;
         if (page === 1)
             return;
         page -= 1;
         this.setState({ currentPage: page }, () => {
             this.onSubmit();
         });
     }

     onSubmit = async () => {
         const sellerid = this.props.match.params.id;
         const data = {
             currentPage: this.state.currentPage,
             id: sellerid
         }
         await axios.put("/viewProductsUnderSeller", data)
             .then(res => {
                 this.setState({
                     productdetails: res.data
                 })
                 console.log("This is p", this.state.productdetails);
             })
     }
    render() {
        const sellerName = this.props.match.params.sellerName;
        const monthnames = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
        var temp = []
        for (var i = 0; i < this.state.months.length; i++) {
            temp.push(monthnames[this.state.months[i] - 1])
        }
        const data = {
            labels: temp,
            datasets: [
                {
                    label: 'Monthly Amount Earned By Sales in Dollars($).',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(16, 184, 196)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.count
                }
            ]
        }


        let products;
        var pageBar, showPageBar;
        if (this.state.productdetails != null) {
            showPageBar = true;
            products = this.state.productdetails.map(product => {
                
            
                let productimg = isFieldEmpty(product.products.productImage[0]) ?
                    product_image : product.products.productImage[0];
                return (
                    <div>
                        <div id="itemAdminRight" >
                            <div className="col">
                                <div className="card" id="cardadminclass" > 
                                    {/* {unknown} */}
                                    <img src={productimg} className="card-img-top" id="cardadmin-img-top" alt="..." />
                                    <div className="card-block" id="cardadmin-title-text">
                                        <h6 className="card-title lead" id="cardadmin-title">{product.sellerName}</h6>
                                        <p className="card-text lead" id="cardadmin-text">{product.products.productName}</p>
                                        
                                        <span>
                                            <p className="card-text lead" id="cardadmin-text">${product.products.productPrice}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        let threedotone = ""
        if (this.state.currentPage > 2) {
            threedotone = <li className="page-item ">
                <div className="page-link" ><span aria-hidden="true">...</span></div>
            </li>
        }
        let one
        if (this.state.currentPage >= 2) {
            one = <li className="page-item ">
                <div className="page-link" onClick={this.prevPage}><span aria-hidden="true">{this.state.currentPage - 1}</span></div>
            </li>
        }
        let threedottwo = <li className="page-item ">
            <div className="page-link" ><span aria-hidden="true">...</span></div>
        </li>
        if (showPageBar) {
            pageBar = (
                <div className="col-sm-12 justify-content-center mt-1">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item ">
                                <div className="page-link" onClick={this.prevPage} aria-label="Previous"><span aria-hidden="true">&laquo;</span></div>
                            </li>
                            {/* {threedotone}
                            {one}
                            <li className="page-item ">
                                <div className="page-link" ><span className="active" aria-hidden="true">{this.state.currentPage}</span></div>
                            </li>
                            <li className="page-item ">
                                <div className="page-link" onClick={this.nextPage}><span aria-hidden="true">{this.state.currentPage + 1}</span></div>
                            </li>
                            {threedottwo} */}
                            <li className="page-item">
                                <div className="page-link" onClick={this.nextPage} aria-label="Next"><span aria-hidden="true">&raquo;</span></div>
                            </li>
                        </ul>
                    </nav>
                </div>
            );
        }


        return (
            <div>
                <Navbar />
                <div>
                    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                    <div className="container">

                        <div className="dash-one">
        <h3 className="display-4">{sellerName}{"'s  "}Products</h3>
                        </div>

                        <div className="container">
                            <div className="row mt-4">
                                <div className="card card-custom mx-4 mb-5" style={{ boxShadow: "2px 2px 2px #888888", "height": "30em", "width": "55em" }}>

                                    <div className="card-body" style={{ "height": "30em", "width": "55em" }}>
                                        <div>
                                            <div style={{ background: "#fafafa" }}>
                                                <Bar ref="chart" data={data}
                                                    options={{
                                                        maintainAspectRatio: true,
                                                        scales: {
                                                            yAxes: [{
                                                                ticks: {
                                                                    beginAtZero: true,
                                                                    stepSize: 1000
                                                                }
                                                            }]
                                                        }, title: {
                                                            display: true,
                                                            text: 'Monthly Amount Earned By Sales in Dollars($)'
                                                        }
                                                    }} />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {this.state.productdetails.length > 0 ? (


                            
                        <div className="row ">
                            <div className="col">
                                <br />
                                <div className="row">
                                    {products}
                                </div>
                            </div>
                            {pageBar}
                        </div>
                        ) : (
                                <div>
                                    <h4 style={{ margin: "3em" }}>No products to display!</h4>
                                </div>
                            )}
                    </div>
                </div> 
            </div>
        )
    }
}


export default viewProductsUnderSeller;