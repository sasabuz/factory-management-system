import { Request, Response } from "express";
import { getExpenses, getPresentEmployees, getProductsStock, getSalaryStatus, getSales, getTotalEmployees } from "./overview.service";

// get total employees
export const getTotalEmployeesController = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await getTotalEmployees();
    res.status(200).json({
      success: true,
      message: "Success",
      data: response,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


// get total present employees
export const getPresentEmployeesController = async(req:Request, res:Response)=>{
    try {
    const date = req.params.date;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }
    const employees = await getPresentEmployees(date);

    return res.status(200).json({
      success: true,
      data: employees.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
}

// get salary status
export const getSalaryStatusController=async(req:Request, res:Response)=>{
     try {
        const month = req.params.month;

        if (!month) {
            return res.status(400).json({
                success: false,
                message: "Month is required",
            });
        }

        const { paidCount, unpaidCount } = await getSalaryStatus(month);

        return res.status(200).json({
            success: true,
            data: {
                paidCount,
                unpaidCount,
            },
        });

    } catch (err) {
        console.error("Error getting salary status:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch salary status",
        });
    }
}

// get prodcuts stock
export const getProductsStockController = async (req: Request, res: Response) => {
  try {
    const products = await getProductsStock();

    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (err) {
    console.error("Failed to fetch products stock:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching product stock"
    });
  }
};

// get sales
export const getSalesController = async (req: Request, res: Response) => {
  try {
    const { todaySales, monthSales } = await getSales();

    // Count & total amount
    const todayCount = todaySales.length;
    const todayTotal = todaySales.reduce((acc, sale) => acc + sale.totalPrice, 0);

    const monthCount = monthSales.length;
    const monthTotal = monthSales.reduce((acc, sale) => acc + sale.totalPrice, 0);

    res.status(200).json({
      success: true,
      data: {
        today: { count: todayCount, total: todayTotal },
        month: { count: monthCount, total: monthTotal }
      }
    });
  } catch (err) {
    console.error("Failed to get sales:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sales"
    });
  }
};

// get expenses
export const getExpensesController = async (req: Request, res: Response) => {
  try {
    const result = await getExpenses();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("Failed to get expenses:", err);
    res.status(500).json({ success: false, message: "Failed to fetch expenses" });
  }
};