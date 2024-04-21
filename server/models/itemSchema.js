import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  imagePaths: {
    type: Array,
    default: []
  },
  specificDetails: {
    type: Array,
    required: true
  }
})

const Item = mongoose.model('Item', itemSchema);
export default Item;