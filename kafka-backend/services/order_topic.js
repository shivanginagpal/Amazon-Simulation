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
        case "deleteOrderItem":
            deleteOrderItem(msg, callback);
            break;
        case "deleteOrder":
            cancelOrder(msg, callback);
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
        await Cart.update(
            {"customerEmail" : msg.body.customerEmail},
            {$pull : {"products" : {"cartStatus" : "IN_CART"}}}
        )
        .then( async amount => {
            await Cart.update(
                {"customerEmail" : msg.body.customerEmail},
                {$set : {"totalAmount" : 0}}
            )
        }
        )
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

async function deleteOrderItem(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND DELETE ORDER ITEM=========="+JSON.stringify(msg))
    await Order.update(
        {"_id": msg.item.itemId, "products._id" : msg.item.productId },
        {$set : {"products.$.productOrderStatus" : "CANCELLED"}}
    )
    .then(async updatedOrder => {
        console.log("UPDATED ORDER =====" +JSON.stringify(updatedOrder));
        response = prepareSuccess(updatedOrder);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}

async function cancelOrder(msg, callback) {
    let response = {};
    let result = {};
    let err = {};
    console.log("KAFKA BACKEND CANCEL ORDER=========="+JSON.stringify(msg.id))
    await Order.updateOne(
        {"_id": msg.id},
        {$set : {"orderStatus" : "CANCELLED", "products.$[].productOrderStatus": "CANCELLED"}}
        //, "products.$[].productOrderStatus": "CANCELLED"
    )
    .then(async updatedOrder => {
        console.log("UPDATED ORDER =====" +JSON.stringify(updatedOrder));
        response = prepareSuccess(updatedOrder);
        return callback(null, response);
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}
