import axiosInstance from "@/lib/api";
import { create } from "zustand";

interface Product {
  name: string;
  quantity: number;
}

interface SalesData {
  count: number | null;
  total: number | null;
}

interface ExpenseSummary {
  totalCount: number | null;
  totalAmount: number;
}


interface OverviewState {
  totalEmployees: number | null;
  totalPresentEmployees: number | null;
  gettingTotalEmployees: boolean;
  gettingPresentEmployees: boolean;
  totalPaid: number | null;
  totalUnpaid: number | null;
  gettingSalaryStatus: boolean;
  products: Product[] | null;
  gettingProducts: boolean;

  salesToday: SalesData;
  salesMonth: SalesData;
  gettingSales: boolean;

  expenses: ExpenseSummary;
  gettingExpenses: boolean;

  getTotalEmployees: () => void;
  getPresentEmployees: (date: string) => void;
  getSalaryStatus: (month: string) => void;
  getProductsStock: () => void;
  getSales: () => void;
  getExpenses: () => void;
}

export const useOverviewStore = create<OverviewState>((set) => ({
  totalEmployees: null,
  totalPresentEmployees: null,
  gettingPresentEmployees: false,
  gettingTotalEmployees: false,
  totalPaid: null,
  totalUnpaid: null,
  gettingSalaryStatus: false,
  products: null,
  gettingProducts: false,

  salesToday: { count: null, total: null },
  salesMonth: { count: null, total: null},
  gettingSales: false,

  expenses: { totalCount: null, totalAmount: 0 },
  gettingExpenses: false,

  //get total employees
  getTotalEmployees: async () => {
    set({ gettingTotalEmployees: true });
    try {
      const response = await axiosInstance.get<{ data: number }>(
        "/overview/totalEmployees"
      );
      set({ totalEmployees: response.data.data });
    } catch (err: any) {
    } finally {
      set({ gettingTotalEmployees: false });
    }
  },

  //get present employee
  getPresentEmployees: async (date) => {
    set({ gettingPresentEmployees: true });
    try {
      const response = await axiosInstance.get<{ data: number }>(
        `/overview/totalPresentEmployees/${date}`
      );
      set({ totalPresentEmployees: response.data.data });
    } catch (err) {
      console.error("Failed to get present employees", err);
      set({ totalPresentEmployees: 0 });
    } finally {
      set({ gettingPresentEmployees: false });
    }
  },

  // get salary status
  getSalaryStatus: async (month) => {
    set({ gettingSalaryStatus: true });
    try {
      const response = await axiosInstance.get<{
        data: { paidCount: number; unpaidCount: number };
      }>(`/overview/salaryStatus/${month}`);

      set({
        totalPaid: response.data.data.paidCount,
        totalUnpaid: response.data.data.unpaidCount,
      });
    } catch (err: any) {
      console.log("Failed to get salary status", err);
      set({
        totalPaid: 0,
        totalUnpaid: 0,
      });
    } finally {
      set({ gettingSalaryStatus: false });
    }
  },

  // get productrs stock
  getProductsStock: async () => {
    set({ gettingProducts: true });
    try {
      const response = await axiosInstance.get<{ data: Product[] }>(
        "/overview/productsStock"
      );
      set({ products: response.data.data });
    } catch (err) {
      console.error("Failed to fetch products stock:", err);
      set({ products: [] });
    } finally {
      set({ gettingProducts: false });
    }
  },

   // get sales
  getSales: async () => {
    set({ gettingSales: true });
    try {
      const response = await axiosInstance.get<{
        data: { today: SalesData; month: SalesData };
      }>("/overview/getSales");

      set({
        salesToday: response.data.data.today,
        salesMonth: response.data.data.month,
      });
    } catch (err) {
      set({
        salesToday: { count: 0, total: 0 },
        salesMonth: { count: 0, total: 0 },
      });
      console.error("Failed to fetch sales", err);
    } finally {
      set({ gettingSales: false });
    }
  },

  // get expenses
   getExpenses: async () => {
    set({ gettingExpenses: true });
    try {
      const response = await axiosInstance.get<{ data: ExpenseSummary }>("/overview/expenses");
      set({ expenses: response.data.data });
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
      set({ expenses: { totalCount: 0, totalAmount: 0 } });
    } finally {
      set({ gettingExpenses: false });
    }
  },

}));
