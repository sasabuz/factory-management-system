import Expense from "./expense.model"

interface ExpenseType{
    name:string,
    description:string,
    date:string,
    amount:number
}


// Add expenses
export const addExpense = async(data:ExpenseType)=>{
    const newExpense = new Expense(data);
    await newExpense.save();
    return newExpense;
}

// get expenses
export const getExpenses = async() =>{
    const response = await Expense.find().sort({date:-1});
    return response;
}

//delete expense
export const deleteExpense = async(id:string)=>{
    const result = await Expense.findByIdAndDelete(id);
    if(!result) throw new Error('Expense Not found!');
    return result;
}