import { toast } from "@/components/ui/toast";
import axiosInstance from "@/lib/api";
import { create } from "zustand";

export interface Product {
  _id?: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Data {
  products: [];
  total: number;
}

export interface ProductStore {
  products: Product[];
  product: Product | null;
  total: number;
  isLoading: boolean;
  isLoadingProductById: boolean;
  isUpdatingQuantity: boolean;
  isUpdatingProduct: boolean;
  isDeleting:boolean;
  isAdding:boolean,
  fetched:boolean,
  getProducts: (searchTerm?: string, pagination?: number) => Promise<void>;
  getProductById: (productId?: string) => Promise<void>;
  updateProductQuantity: (
    productId?: string,
    quantity?: number
  ) => Promise<void>;
  updateProduct: (productId?: string, data?: Product) => Promise<void>;
  deleteProductById:(productId?:string)=>Promise<void>;
  addProduct:(newProduct?:Product)=>Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  total: 0,
  product: null,
  isLoadingProductById: true,
  isUpdatingQuantity: false,
  isUpdatingProduct: false,
  isDeleting:false,
  isAdding:false,
  fetched:false,

  //get all product
  getProducts: async (searchTerm?: string, pagination?: number) => {
    const {fetched} = get();

    if(!searchTerm && fetched){
      //already cached
    }
    else{
      set({ isLoading: true });
    }
    
    try {
      const query = searchTerm
        ? `?search=${searchTerm}&page=${pagination}`
        : `?page=${pagination}`;

      const response = await axiosInstance.get<{ data: Data }>(
        `/production${query}`
      );
      set({ products: response.data.data.products });
      set({ total: response.data.data.total });
      set({fetched:true});
    } catch (err: any) {
      console.log("Error in product store to fetch products!");
    } finally {
      set({ isLoading: false });
    }
  },

  // get a single product
  getProductById: async (productId?: string) => {
    set({ isLoadingProductById: true });
    try {
      const response = await axiosInstance.get<{ data: Product }>(
        `/production/${productId}`
      );
      set({ product: response.data.data });
    } catch (err) {
    } finally {
      set({ isLoadingProductById: false });
    }
  },

  // update only quantity
  updateProductQuantity: async (productId?: string, quantity?: number) => {
    set({ isUpdatingQuantity: true });
    try {
      const response = await axiosInstance.patch<{ data: Product }>(
        `/production/${productId}`,
        { quantity }
      );
      set({ product: response.data.data, fetched:false });

      // update products list too if it exists
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? response.data.data : p
        ),
      }));
    } catch (err: any) {
      console.log("Error updating quantity:", err);
    } finally {
      set({ isUpdatingQuantity: false });
    }
  },

  //update all field
  updateProduct: async (productId?: string, data?: Product) => {
    set({ isUpdatingProduct: true });
    try {
      if (!productId) {
        throw new Error("Product ID is required for update");
      }

      const response = await axiosInstance.put<{ data: Product }>(
        `/production/${productId}`,
        data
      );

      const updatedProduct = response.data.data;

      //update the product in store
      set({ product: updatedProduct, fetched:false });

      // update the product list in store
      set((state) => ({
        products: state.products.map((p) =>
          p._id === productId ? updatedProduct : p
        ),
      }));
    } catch (err: any) {
      console.error(
        "Error updating product:",
        err.response?.data || err.message
      );
    } finally {
      set({ isUpdatingProduct: false });
    }
  },
  // delete a product item
  deleteProductById: async(productId?:string)=>{
    set({isDeleting:true});
    try{
      await axiosInstance.delete(`/production/${productId}`);
      set({fetched:false});
      set((state) => ({
      products: state.products.filter((p) => p._id !== productId),
    }));
    } 
    catch{
      console.log("An error occured to delete prodcut item");
      toast.error("Error occurred!", {
        position: "top-right",
        description: "Something went wrong. Please try again.",
      });
    }
    finally{
      set({isDeleting:false});
    }
    
  },

  addProduct: async (newProduct?: Product) => {
    if (!newProduct) return;
    set({ isAdding: true });

    try {
      const response = await axiosInstance.post<{ data: Product }>(
        "/production",
        newProduct
      );
      set({fetched:false});
      set((state) => ({
        products: [response.data.data, ...state.products],
      }));
    } catch (err: any) {
      console.log("Error adding product:", err);
    } finally {
      set({ isAdding: false });
    }
  },
}));
