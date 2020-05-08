const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number
    },
    productCategory: {
        type: Schema.Types.ObjectId
    },
    productDescription: {
        type: String,
    },
    productRemoved: {
        type: Boolean,
        default: false
    },
    productImage: {
        type: Array,
        default: ""
    },
    productRating: {
        type: Number
    },
    productReview: [{
        customerId: {
            type: Schema.Types.ObjectId,
        },
        comment: {
            type: String
        },
        rating: {
            type: Number
        }
    }],
    productViewCount: {
        type: Number,
        default: 0
    },
    productViewDate: {
        type: String,
        default: ''
    }
    // productViews: [{
    //     viewCount : {
    //     type: Number
    // },
    //     viewDate : {
    //     type : String
    // }
    // }]
})

var Product = mongoose.model("Product", ProductSchema);
exports.Product = Product;
exports.ProductSchema = ProductSchema;