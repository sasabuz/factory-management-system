import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Production",
    required: true,
  },
  productName:{
    type:String,
    required:true,
  },
  unit: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  buyerName:{
    type:String,
    required:true,
  },
  buyerMobileNumber:{
    type:String,
    required:true,
  },
  soldAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Sale = mongoose.model("Sale", saleSchema);

export default Sale;
