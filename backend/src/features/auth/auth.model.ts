import mongoose from 'mongoose';

// @ts-ignore
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  employeeId: {
    type: Number,
    unique: true // Auto incremented
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'accountant', 'worker'],
    default: 'worker'
  },
  image: {
    type: String,
    default: ''
  },
  salary: {
    type: Number,
    default: 0
  },
  lastLogin: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Auto increment employeeId
userSchema.plugin(AutoIncrement, { inc_field: 'employeeId' });

const User =  mongoose.model('User', userSchema);
export default User;
