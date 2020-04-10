const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductCategorySchema = require('./ProductCategory');

const SellerSchema = new Schema({
    seller : {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    sellerName: {
        type: String,
        required: true,
        unique: true
    },
    // sellerEmail: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // sellerPassword: {
    //     type: String,
    //     required: true
    // },
    // sellerImage: {
    //     type: String,
    //     default: ""
    // },
    sellerAddress: {
        type: String,
        default: ""
    },
    productCategory: [ProductCategorySchema]

});

module.exports = Seller = mongoose.model('sellers', SellerSchema);