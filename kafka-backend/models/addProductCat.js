const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addProductCatSchema = new Schema({
    productCategoryName: {
        type: String,  
    }
})

var addProductCat = mongoose.model("addProductCat", addProductCatSchema);
exports.addProductCat = addProductCat;
exports.addProductCatSchema = addProductCatSchema;