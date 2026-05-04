import { Request, Response } from "express";
import { addExpense, deleteExpense, getExpenses} from "./expense.service";

// add expense
export const addExpenseController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await addExpense(data);
    res.status(201).json({
      success: true,
      message: "Added Expense Successfully",
      data: response
    });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "An error occured to adding expenses",
      error: err,
    });
  }
};

export const getExpensesController = async(req:Request, res:Response)=>{
  try {
    const expenses = await getExpenses();

    return res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
      error: err.message,
    });
  }
}

//delete expense
export const deleteExpenseController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await deleteExpense(id);

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    console.error("Error deleting expense:", err.message || err);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting expense",
      error: err.message || err,
    });
  }
};