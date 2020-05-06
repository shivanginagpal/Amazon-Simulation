const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productsSchema = new Schema({
    productName : {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productQuantity:{
        type: String,
        required: true
    },
    productSellerId: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    productOrderStatus: {
        type: String,
        enum: ["NEW", "PACKING", "OUT_FOR_SHIPPING","PACKAGE_ARRIVED","OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
    }
})

const OrderSchema = new Schema({
    customerId : {
        type: Schema.Types.ObjectId
    },
    products: [productsSchema],
    orderStatus: {
        type: String,
        enum: ["NEW", "PACKING", "OUT_FOR_SHIPPING","Package_Arrived","OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    subTotal:{ 
        type: String,
        required: true
    },
    discount: {
        type: String, 
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    totalAmount: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('order', OrderSchema);