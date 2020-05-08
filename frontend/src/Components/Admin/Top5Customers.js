import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

 class Top5Customers extends Component {
     constructor(props) {
         super(props);
         this.state = {
             customers: [],
             count: []
         }
     }

     componentDidMount() {
         axios.get("/top5Customers")
             .then((response) => {
                 console.log("THIS IS RESPONSE", response);
                 let customersArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     customersArr.push(item._id);
                     valArr.push(item.amount)
                 });
                 this.setState({
                     customers: customersArr,
                     count: valArr
                 });
             })
     }
    render() {
        const data = {
            labels: this.state.customers,
            datasets: [
                {
                    label: 'Top 5 Customers.',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(52, 198, 235)',
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
                    pointHoverBorderWidth: 0.2,
                    pointRadius: 0.1,
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
                                        stepSize: 1000
                                    }
                                }]
                            }, title: {
                                display: true,
                                text: 'Top 5 Customers'
                            }
                        }} />
                </div>
            </div>
        )
    }
}

export default Top5Customers;
