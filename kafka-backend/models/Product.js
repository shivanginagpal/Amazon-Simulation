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
    productImage: [
        {type: String,
        default:""}
    ],
    productRating: {
        type: Number
    },
    productReview: [{
        customerId: {
            type: Schema.Types.ObjectId,
        },
        comment : {
            type: String
        },
        rating: {
            type: Number
        }
    }]
})

module.exports = Product = mongoose.model('product', ProductSchema);