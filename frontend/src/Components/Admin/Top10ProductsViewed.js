import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

 class Top10ProductsViewed extends Component {
     constructor(props) {
         super(props);
         this.state = {
             products: [],
             count: []
         }
     }

     componentDidMount() {
         axios.get("/top10ProductsViewed")
             .then((response) => {
                 console.log("THIS IS RESPONSE", response);
                 let sellersArr = [];
                 let valArr = [];
                 response.data.forEach((item) => {
                     sellersArr.push(item.productName);
                     valArr.push(item.count)
                 });
                 this.setState({
                     products: sellersArr,
                     count: valArr
                 });
             })
     }

    render() {
        const data = {
            labels: this.state.products,
            datasets: [
                {
                    label: 'Top 10 products viewed.',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(235, 64, 52)',
                    borderColor: 'rgba(0,0,0)',
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
                                        stepSize: 1
                                    }
                                }]
                            }, title: {
                                display: true,
                                text: 'Top 10 products Viewed'
                            }
                        }} />
                </div>
                
            </div>
        )
    }
}

export default Top10ProductsViewed;
