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
    deliveryAddrees: {
        type: String,
        required: true
    },
    paymentInfo: {
        cardNumber: {
            type : String,
            required: true
        },
        cardExpiryDate:{
            type: Date,
            required: true
        },
        cardHolderName: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('order', OrderSchema);