const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ProductSchema} = require('./Product');

var address = {
	fullName : {type: String, required: true}, 
    addrLine1 : {type: String, required: true}, 
	addrLine2 : {type: String, default: ""}, 
	city : {type: String, required: true}, 
	state : {type: String, required: true}, 
	country : {type: String, required: true},
	zipCode : {type: String, required: true},
	phoneNumber: {type: String, required: true}
}

var paymentInfo = {
	cardNumber : {type: String, required: true}, 
	expiryYear : {type: String, required: true},
	expiryMonth : {type: String, required: true}, 
	name : {type: String, required: true}, 
	cvv : {type: String, required: true}
}

var CustomerSchema = new Schema({
	customer : {type: Schema.Types.ObjectId, ref: 'user'},
    // firstName: {type: String, required: true},
	// lastName: {type: String, required: true},
    //customerEmail: {type: String, required: true, unique: true},
    //password: {type: String, required: true},
	customerProfilePicture: {type: String, default: null},
    savedAddresses: [address],
	paymentOptions: [paymentInfo],
	products: [ProductSchema]
},
{
    versionKey: false
});

module.exports = mongoose.model('Customer', CustomerSchema);