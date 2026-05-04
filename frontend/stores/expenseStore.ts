import axiosInstance from "@/lib/api";
import { create } from "zustand";

interface ExpenseData {
  _id?: string;
  name: string;
  description: string;
  date: string;
  amount: number;
}

interface ExpenseResponse {
  success: boolean;
  message: string;
  data: ExpenseData[];
}

interface ExpenseStoreState {
  expenses: ExpenseData[];
  isLoading: boolean;
  isAddingExpense: boolean;
  isDeleting: boolean;
  fetched:boolean;
  AddExpense: (value: ExpenseData) => Promise<ExpenseResponse>;
  getExpenses: () => Promise<void>;
  deleteExpense: (value: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStoreState>((set, get) => ({
  expenses: [],
  isLoading: false,
  isAddingExpense: false,
  isDeleting: false,
  fetched:false,

  //add expense
  AddExpense: async (expenseData) => {
    set({ isAddingExpense: true });
    try {
      const response = await axiosInstance.post<{ data: ExpenseData }>(
        "/expense",
        expenseData
      );

      set((state) => ({
        expenses: [response.data.data, ...state.expenses],
        fetched:false
      }));
      return response.data;
    } catch (err: any) {
      return err.response.data;
    } finally {
      set({ isAddingExpense: false });
    }
  },

  // get Expenses
  getExpenses: async () => {
    const {fetched} = get();
    if(fetched){
      //already list is cashed
    }
    else{
      set({ isLoading: true });
    }
    
    try {
      const response = await axiosInstance.get<ExpenseResponse>("/expense");
      set({ expenses: response.data.data, fetched:true });
    } catch (err: any) {
      console.log(err.response.message);
    } finally {
      set({ isLoading: false });
    }
  },

  // delete Expenses
  deleteExpense: async (expId) => {
    set({ isDeleting: true });
    try {
      const response = await axiosInstance.delete<{ success: boolean }>(
        `/expense/${expId}`
      );
      if (response.data.success) {
        set((state) => ({
          expenses: state.expenses.filter((exp) => exp._id !== expId),
          fetched:false
        }));
      } else {
        console.log("Error occure to delete expense");
      }
    } catch (err: any) {
      console.log(err.response.message);
    } finally {
      set({ isDeleting: false });
    }
  },
}));
