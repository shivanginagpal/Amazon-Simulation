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
    productSellerName: {
        type: String, 
        required: true
    }
})

const OrderSchema = new Schema({
    customerId : {
        type: Schema.Types.ObjectId
    },
    products: [productsSchema],
    orderStatus: {
        type: String,
        enum: ["New", "Packing", "Out For Shipping", "Delivered", "Cancelled"]
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
    deliveryAddrees: {
        type: String,
        required: true
    },
    paymentInfoId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('order', OrderSchema);