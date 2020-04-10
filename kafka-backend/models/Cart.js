var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CartSchema = new Schema({
  customerEmail: {
    type: String,
  },
  sellerName: {
    type: String
  },
  productId: {
    type: Schema.Types.ObjectId
  },
  productName: {
    type: String
  },
  productPrice: {           
    type: Number
  },
  productQuantity: {
    type: Number
  },
  productTotal: {
    type: Number
  },
  cartStatus: {
    type: String,
        enum: ["In Cart", "Saved For Later"]
  }
});

modules.export = Cart = mongoose.model('cart',CartSchema)