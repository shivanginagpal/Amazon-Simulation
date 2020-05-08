import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

 class Top5SoldProducts extends Component {
     constructor(props) {
         super(props);
         this.state = {
             products: [],
             count: []
         }
     }
     componentDidMount() {
         axios.get("/top5SoldProducts")
             .then((response) => {
                 console.log("THIS IS RESPONSE", response);
                 let productsArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     productsArr.push(item._id);
                     valArr.push(item.count)
                 });
                 this.setState({
                     products: productsArr,
                     count: valArr
                 });
                 console.log(this.state.products);
             })
     }

    render() {
        const data = {
            labels: this.state.products,
            datasets: [
                {
                    label: 'Top 5 Sold Products.',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(52, 235, 208)',
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

        return (
            <div>
                <div style={{ background: "#fafafa" }}>
                    <Bar ref="chart" data={data}
                        options={{
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 10
                                    }
                                }]
                            }, title: {
                                display: true,
                                text: 'Top 5 Sold Products'
                            }
                        }} />
                </div>
                
            </div>
        )
    }
}

export default Top5SoldProducts;