import validator from "validator";
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  userDetails: {
    type: Object,
    of: {
      firstname: String,
      lastname: String,
      address: String,
      phonenumber: String,
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
    },
    isPaid: {
      type: Boolean,
      default: false
    }
  }],
  total: {
    type: Number,
    default: 0
  }
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
