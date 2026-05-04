import Attendance from "../attendance/attendance.model";
import User from "../auth/auth.model"
import Expense from "../expense/expense.model";
import Production from "../production/production.model";
import Salary from "../salary/salary.model";
import Sale from "../sales/sales.model";

interface ExpenseSummary {
  totalCount: number;
  totalAmount: number;
}

// get total employees
export const getTotalEmployees = async()=>{
     const total = await  User.countDocuments();
     return total-1;
}

// get present employees
export const getPresentEmployees =async(date:string)=>{
    const response = await Attendance.find({
        date,
        status:'present'
    })
    return response;
}

// get salary staus
export const getSalaryStatus = async(month:string)=>{
    const paid= await Salary.find({
        month,
        status:'paid'
    });
    const paidCount = paid.length;
    const total = await  User.countDocuments();
    const unpaidCount = total-1-paidCount;

    return {paidCount, unpaidCount};
}

// get products stock
export const getProductsStock = async()=>{
    const products = Production.find({},{
        name:1,
        quantity:1,
        _id:0
    });
    return products;
}

// get sales
export const getSales = async () => {
  const today = new Date();

  // Start & end of today
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  // Start & end of this month
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  // Today sales
  const todaySales = await Sale.find({
    createdAt: { $gte: startOfDay, $lt: endOfDay }
  });

  // This month sales
  const monthSales = await Sale.find({
    createdAt: { $gte: startOfMonth, $lt: endOfMonth }
  });

  return {
    todaySales,
    monthSales
  };
};

// get expenses
export const getExpenses = async (): Promise<ExpenseSummary> => {
  const today = new Date();

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  // DB query
  const expenses = await Expense.find({
    date: { $gte: firstDay.toISOString(), $lt: lastDay.toISOString() },
  });

  const totalCount = expenses.length;
  const totalAmount = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return { totalCount, totalAmount };
};