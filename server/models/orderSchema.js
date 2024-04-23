import mongoose from "mongoose";
import validator from "validator";

const orderSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
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
  items: [{
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
  }],
  isPriority: {
    type: Boolean,
    default: false
  },
  isComplete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema)
export default Order;