import { create } from "zustand";
import axiosInstance from "@/lib/api";

interface SalePayload {
  productId: string;
  productName: string;
  unit: number;
  totalPrice: number;
  buyerName: string;
  buyerMobileNumber: string;
}

interface Sale {
  _id: string;
  productId: string;
  productName: string;
  unit: number;
  totalPrice: number;
  buyerName: string;
  buyerMobileNumber: string;
  createdAt: string;
  soldAt: string;
}

interface SalesStore {
  sales: Sale[];
  total: number;
  isLoadingSales: boolean;
  isAddingSale: boolean;
  isDeleting: boolean;

  getAllSales: () => Promise<void>;
  addNewSale: (data: SalePayload) => Promise<void>;
  deleteSale: (id: string) => void;
}

export const useSalesStore = create<SalesStore>((set, get) => ({
  sales: [],
  total: 0,
  isLoadingSales: false,
  isAddingSale: false,
  isDeleting: false,

  // get all sales
  getAllSales: async () => {
    set({ isLoadingSales: true });
    try {
      const response = await axiosInstance.get<{ data: Sale[]; total: number }>(
        "/sales"
      );

      set({
        sales: response.data.data || [],
        total: response.data.total || 0,
      });
    } catch (err) {
      console.error("Error fetching sales:", err);
      throw err;
    } finally {
      set({ isLoadingSales: false });
    }
  },

  //add new sale
  addNewSale: async (data: SalePayload) => {
    set({ isAddingSale: true });
    try {
      if (!data.productName) throw new Error("Product name is required");

      await axiosInstance.post("/sales/add", data);
    } catch (err) {
      console.log("Error adding sale:", err);
      throw err;
    } finally {
      set({ isAddingSale: false });
    }
  },

  // delete a sale
  deleteSale: async (saleId) => {
    const { sales } = get();
    const prevState = sales;
    //optimistic delete
    set({
      sales: sales.filter((sale) => sale._id !== saleId),
      isDeleting: true,
    });

    try {
      await axiosInstance.delete(`/sales/${saleId}`);
    } catch (err) {
      console.log("Something went wrong.");
    } finally {
      set({ isDeleting: false });
    }
  },
}));
