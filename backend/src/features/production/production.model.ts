import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  unit: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

const Production = mongoose.model("Production", productSchema);

export default Production;