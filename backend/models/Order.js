const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productSellerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    productSellerName: {
        type: String,
        required: false
    },
    productOrderStatus: {
        type: String,
        enum: ["NEW", "PACKING", "OUT_FOR_SHIPPING", "PACKAGE_ARRIVED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
    }
})

const OrderSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId
    },
    customerName: {
        type: String,
        required: false
    },
    customerEmail: {
        type: String,
        required: false
    },
    products: [productsSchema],
    orderStatus: {
        type: String,
        enum: ["NEW", "PACKING", "OUT_FOR_SHIPPING", "Package_Arrived", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"]
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    subTotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    tax: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
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

