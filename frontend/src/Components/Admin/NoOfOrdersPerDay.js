import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class NoOfOrdersPerDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
            count: []
        }
    }
    componentDidMount(){
        axios.get("/noOfOrdersPerDay")
        .then((response) => {
            console.log("THIS IS RESPONSE", response);
            let daysArr =[];
            let valArr = [];
            response.data.forEach((item) => {
                let date=item._id.substring(0, item._id.indexOf('T'));
                daysArr.push(date);
                valArr.push(item.orders)
            });
            this.setState({
                days: daysArr,
                count: valArr
            });
            console.log(this.state.days);
        })
    }   
    render() {
        const data = {
            labels: this.state.days,
            datasets: [
                {
                    label: 'No. of orders per day.',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
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
                                        stepSize: 2
                                    }
                                }]
                            }, title: {
                                display: true,
                                text:'No.Of orders per day'
                            }
                        }} />
                </div>
            </div>
        )
    }
}

export default NoOfOrdersPerDay;