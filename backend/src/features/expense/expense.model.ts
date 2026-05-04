import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:String,
        reuired:true,
    },
    amount:{
        type:Number,
        required:true,
        min:0        
    }
},{
    timestamps:true
})

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;