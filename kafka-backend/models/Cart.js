var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = {
	productId: {type: Schema.Types.ObjectId},
	productQuantity: {type: Number},
	gift: {type: Boolean, default: false},
	giftMessage: {type: String, default: ""},
	giftCharge: {type: Number, default: 2}
}

const CartSchema = new Schema({
  customerEmail: {
    type: String,
  },
  sellerName: {
    type: String
  },
  products: [product],
  subTotal : {
    type: Number
  },
  tax : {
    type: Number
  },
  totalAmount: {
    type: Number
  },
  cartStatus: {
    type: String,
        enum: ["IN_CART", "SAVED_FOR_LATER"]
  }
});

modules.export = Cart = mongoose.model('cart',CartSchema)