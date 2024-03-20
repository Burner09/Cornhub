import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema)
export default Order;