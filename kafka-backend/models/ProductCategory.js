const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = require('./Product');

const ProductCategorySchema = new Schema({
    productCategoryName : {
        type:String,
        required: true
    },
    seller : {
        type: Schema.Types.ObjectId
    },
    products: [ProductSchema]
})


module.exports = ProductCategory = mongoose.model('productCategory', ProductCategorySchema);