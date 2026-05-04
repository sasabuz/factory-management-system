import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "unpaid",
    required: true,
  },
}, { timestamps: true });

const Salary = mongoose.model('Salary', salarySchema);

export default Salary;