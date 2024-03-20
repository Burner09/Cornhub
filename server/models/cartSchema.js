import validator from "validator";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  userDetails: {
    type: Map,
    of: {
      firstName: String,
      lastName: String,
      address: String,
      email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email address']
      }
    },
    required: false,
  },
  userCart: [{
    productID: {
      type: String,
      required: true
    },
    selectedDetails: {
      type: Object,
      required: true
    },
    images: {
      type: Array,
      default: []
    }
  }],
  total: {
    type: Number,
    default: 0
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
