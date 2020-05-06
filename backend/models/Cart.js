var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = {
	productId: {type: Schema.Types.ObjectId},
  productQuantity: {type: Number},
  productPrice: {type: Number},
	gift: {type: Boolean, default: false},
	giftMessage: {type: String, default: ""},
  giftCharge: {type: Number, default: 2},
  cartStatus: {
    type: String,
        enum: ["IN_CART", "SAVED_FOR_LATER"]
  }
  
}

const CartSchema = new Schema({
  customerEmail: {
    type: String,
  },
  sellerName: {
    type: String
  },
  products: [product],
 
  totalAmount: {
    type: Number
  }
 
});



var Cart = mongoose.model("Cart", CartSchema);
exports.Cart = Cart;
exports.CartSchema = CartSchema;