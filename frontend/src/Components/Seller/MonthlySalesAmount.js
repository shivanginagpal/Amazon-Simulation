import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {getID} from '../SignUp/helperApis' 


 class MonthlySalesAmount extends Component {
     constructor(props) {
         super(props);
         this.state = {
             months: [],
             count: []
         }
     }
     componentDidMount() {
         const sellerId = getID();
         const data = {
             id: sellerId
         }

         axios("/monthlySellerAmount",{
             method:'put',
             data:data
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


    render() {
        const monthnames =["Jan","Feb","Mar","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
        var temp=[]
        for(var i=0;i<this.state.months.length;i++){
            temp.push(monthnames[this.state.months[i]-1])
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
                                text: 'Monthly Amount Earned By Sales in Dollars($)'
                            }
                        }} />
                </div>

                
            </div>
        )
    }
}

export default MonthlySalesAmount;