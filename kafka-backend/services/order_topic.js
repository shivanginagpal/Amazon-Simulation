const { prepareSuccess, prepareInternalServerError } = require('./responses');
const  Order  = require('../models/Order');
const {Cart} = require('../models/Cart');

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
        console.log("placeOrder response =====" +newOrder);
        console.log("customerEmail::",msg.body.customerEmail);
        await Cart.findOneAndDelete({ "customerEmail": msg.body.customerEmail })
        .then(async cart => {
            console.log("placeOrder cart delete =====" +JSON.stringify(cart));
            result = {
                status : true,
                id : newOrder._id
            }
            response = prepareSuccess(result);
            return callback(null, response);
        })
        .catch(error => {
            console.log(error);
            err = prepareInternalServerError(error);
            return callback(err, null);
        });
    }).catch(error => {
        console.log(error);
        err = prepareInternalServerError(error);
        return callback(err, null);
    });
}
