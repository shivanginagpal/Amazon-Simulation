const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ProductCategorySchema} = require('./ProductCategory');

const SellerSchema = new Schema({
    seller : {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    salesTotal: {
        type: String,
        default: "0"
    },
    sellerAddress: {
        type: String,
        default: ""
    },
    sellerProfilePicture: {
        type: String,
        default: null
    },
    productCategory: [ProductCategorySchema]

});

module.exports = Seller = mongoose.model('sellers', SellerSchema);