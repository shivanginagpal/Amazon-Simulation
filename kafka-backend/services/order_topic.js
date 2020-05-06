const { prepareSuccess, prepareInternalServerError } = require('./responses');
const { Order } = require('../models/Order');

exports.orderService = function orderService(msg, callback) {
    console.log("In order topic service path:", msg.path);
    switch (msg.path) {
        case "placeOrder":
            placeOrder(msg, callback);
            break;
    }
};

async function placeOrder(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND placeOrder =========="+JSON.stringify(msg))
    await Order.insert({
        "customerId" : msg.customerId,
        "products" : msg.products,
        "orderStatus": "NEW",
        "orderDate": new Date,
        "subTotal" : msg.subTotal,
        "tax" : msg.tax,
        "totalAmount": msg.totalAmount,
        "deliveryAddress": msg.deliveryAddress,
        "paymentInfo": msg.paymentInfo
    })
    .then(async newOrder => {
        console.log("placeOrder response =====" +newOrder);
        result = {
            status : true,
            id : newOrder._id
        }
        response = prepareSuccess(result);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}