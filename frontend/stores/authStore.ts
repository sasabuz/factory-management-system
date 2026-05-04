import axiosInstance from "@/lib/api";
import toast from "react-hot-toast";
import { create } from "zustand";
import { Employee, useEmployeeStore } from "./employeeStore";

interface User {
  _id?: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  salary: number;
}

interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
}

interface SignupResponse {
  success: boolean;
  message: string;
  data?: User;
}

interface CheckAuth {
  data: User;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggingIn: boolean;
  errorMessage: string;
  isSigningUp: boolean;
  loggingOut:boolean;
  checkCurrentUser: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: User) => Promise<SignupResponse | null>;
  //  signup: (data: User) => Promise<SignupResponse | null>;
  logout: () => Promise<any>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isLoggingIn: false,
  errorMessage: "",
  isSigningUp: false,
  loggingOut:false,

  // check current user
  checkCurrentUser: async () => {
    set({ isLoading: true });

    try {
      const res = await axiosInstance.get<CheckAuth>("/auth/me");
      set({ user: res.data.data });
    } catch (err: any) {
    } finally {
      set({ isLoading: false });
    }
  },

  // login user
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<LoginResponse>("/auth/login", data);
      set({ user: res.data.data.user });

      // set jwt token into local storage
      //localStorage.setItem("token", res.data.data.token);
      // don't need, because we move now setCookies functions

      toast.success("Logged in successfully!");
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      set({ errorMessage: "Invalid Credentials. Try Again!" });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // signup User
  signup: async (data: User) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post<SignupResponse>(
        `/auth/signup`,
        data
      );
      if (response.data?.success) {
        const newUser = response.data.data! as Employee;

        // EmployeeStore update
        const addEmployee = useEmployeeStore.getState().addEmployee;
        addEmployee(newUser);

        return response.data;
      } else {
        return null;
      }
    } catch (err: any) {
      return err?.response.data;
    } finally {
      set({ isSigningUp: false });
    }
  },

  //logout
  logout: async () => {
    set({loggingOut:true});
    try {
      const response = await axiosInstance.post<{data:any}>("/auth/logout");
      set({ user: null });
      
      return response.data.data;
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to logout!");
    }
    finally{
      set({loggingOut:false});
    }
  },
}));
