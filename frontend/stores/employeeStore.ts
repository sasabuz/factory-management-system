import axiosInstance from "@/lib/api";
import { create } from "zustand";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  image?: string;
}

interface EmployeeState {
  employees: Employee[];
  employee: Employee | null;
  isLoading: boolean;
  isLoadingEmployeeById: boolean;
  isUpdatingEmployee: boolean;
  isDeleting: boolean;

  totalEmployees: number;

  // Catch Flag
  fetched: boolean;

  getAllEmployees: (searchTerm: string, currentPage: number) => Promise<void>;
  getEmployeeById: (id: string) => Promise<void>;
  updateEmployee: (id: string, updatedData: Partial<Employee>) => Promise<void>;
  deleteEmployeeById: (id: string) => Promise<void>;
  addEmployee: (newEmployee: Employee) => void;
}

interface GetAllEmployeeState {
  success: boolean;
  message: string;
  data: {
    employees: Employee[];
    totalEmployees: number;
  };
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
  employees: [],
  employee: null,
  isLoading: false,
  totalEmployees: 0,
  isLoadingEmployeeById: false,
  isUpdatingEmployee: false,
  isDeleting: false,
  fetched: false,

  getAllEmployees: async (searchTerm?: string, currentPage?: number) => {
    const { fetched, employees } = get();

    if (!searchTerm && fetched) {
      // already have data, so so loading
    } else {
      // Only show skeleton on first load OR search
      set({ isLoading: true });
    }

    try {
      // If searching, page should reset to 1
      const pageToUse = searchTerm ? 1 : currentPage || 1;

      const query = searchTerm
        ? `?page=${pageToUse}&search=${searchTerm}`
        : `?page=${currentPage}`;

      const response = await axiosInstance.get<GetAllEmployeeState>(
        `/employee${query}`
      );

      set({
        employees: response.data.data.employees,
        totalEmployees: response.data.data.totalEmployees,

        /** cache only when it's not a search */
        fetched: searchTerm ? false : true,
      });
    } catch (err: any) {
      console.log("Error fetching employees:", err.response?.data || err.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getEmployeeById: async (id: string) => {
    set({ isLoadingEmployeeById: true });
    try {
      const response = await axiosInstance.get<{ data: Employee }>(
        `/employee/${id}`
      );
      set({ employee: response.data.data });
    } catch (err: any) {
      console.log("Error fetching employee:", err.response?.data || err.message);
    } finally {
      set({ isLoadingEmployeeById: false });
    }
  },

  updateEmployee: async (id: string, updatedData: Partial<Employee>) => {
    set({ isUpdatingEmployee: true });
    try {
      await axiosInstance.put(`/employee/${id}`, updatedData);

      const updatedEmployees = get().employees.map((emp) =>
        emp._id === id ? { ...emp, ...updatedData } : emp
      );

      set({
        employees: updatedEmployees,
        employee:
          get().employee?._id === id
            ? { ...get().employee!, ...updatedData }
            : get().employee,

        /** cache reset so next visit reloads fresh data */
        fetched: false,
      });
    } catch (err: any) {
      console.log("Error updating employee:", err.response?.data || err.message);
    } finally {
      set({ isUpdatingEmployee: false });
    }
  },

  deleteEmployeeById: async (id: string) => {
    set({ isDeleting: true });
    try {
      await axiosInstance.delete(`/employee/${id}`);

      set({
        employees: get().employees.filter((emp) => emp._id !== id),

        /** cache reset */
        fetched: false,
      });
    } catch (err) {
      console.log("Error deleting employee:", err);
    } finally {
      set({ isDeleting: false });
    }
  },

  addEmployee: (newEmployee: Employee) => {
    set({
      employees: [...get().employees, newEmployee],

      /** cache reset */
      fetched: false,
    });
  },
}));
