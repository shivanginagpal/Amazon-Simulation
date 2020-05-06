const { prepareSuccess, prepareInternalServerError } = require('./responses');
const  Order  = require('../models/Order');
const {Cart} = require('../models/Cart');

exports.orderService = function orderService(msg, callback) {
    console.log("In order topic service path:", msg.path);
    switch (msg.path) {
        case "placeOrder":
            placeOrder(msg, callback);
            break;
        case "getOrderById":
            fetchOrder(msg, callback);
            break;
        case "getCustomerOrdersById":
            fetchAllCustomerOrders(msg, callback);
            break;
    }
};

async function placeOrder(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND placeOrder =========="+JSON.stringify(msg));
    var insertOrder= new Order({
        "customerId" : msg.body.customerId,
        "products" : msg.body.products,
        "orderStatus": "NEW",
        "orderDate": new Date,
        "subTotal" : msg.body.subTotal,
        "tax" : msg.body.tax,
        "totalAmount": msg.body.totalAmount,
        "deliveryAddress": msg.body.deliveryAddress,
        "paymentInfo": msg.body.paymentInfo
    });
    insertOrder.save()
    .then(async newOrder => {
        await Cart.findOneAndDelete({ "customerEmail": msg.body.customerEmail })
        .then(async cart => {
            result = {
                status : true,
                id : newOrder._id
            }
            response = prepareSuccess(result);
            return callback(null, response);
        })
        .catch(error => {
            err = prepareInternalServerError(error);
            return callback(err, null);
        });
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}

async function fetchOrder(msg, callback) {
    let response = {};
    let err = {};
    console.log("KAFKA BACKEND fetchOrder =========="+JSON.stringify(msg));
    Order.findById(msg.id)
    .then(async newOrder => {
        console.log("GET ORDER RESULT!!!!!!!!!!!!!!!!!"+JSON.stringify(newOrder))
        response = prepareSuccess(newOrder);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}

async function fetchAllCustomerOrders(msg, callback) {
    let response = {};
    let err = {};
    console.log("KAFKA BACKEND fetchAllCustomerOrders =========="+JSON.stringify(msg));
    Order.find({"customerId" : msg.id})
    .then(async orders => {
        console.log("GET ALL CUSTOMER ORDER RESULT!!!!!!!!!!!!!!!!!"+JSON.stringify(orders))
        response = prepareSuccess(orders);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}
