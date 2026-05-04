import axiosInstance from "@/lib/api";
import { create } from "zustand";

interface SalaryInformationState {
  _id?: string;
  empId:string;
  name: string;
  email: string;
  salary: number;
  month: string;
  status: string;
}

interface SalaryInformationsState {
  success: boolean;
  message?: string;
  data: SalaryInformationState[];
  total:number;
}

interface SalaryStoreState {
  salaryInformations: SalaryInformationState[];
  isLoading: boolean;
  fetched: boolean;
  totalEmployeeForSalary:number;

  addSalaryInformation: (
    empId: string,
    status: string,
    month: string
  ) => Promise<void>;
  getSalaryInformations: (month: string, searchTerm:string, currentPage:number) => Promise<void>;
}

export const useSalaryStore = create<SalaryStoreState>((set, get) => ({
  salaryInformations: [],
  isLoading: false,
  fetched: false,
  totalEmployeeForSalary:0,

  // get the salary status in database
  getSalaryInformations: async (month, searchTerm = "", currentPage = 1) => {
  const { fetched } = get();

  if (!searchTerm && fetched) {
    // no skeleton
  } else {
    set({ isLoading: true });
  }

  try {
    const pageToUse = searchTerm ? 1 : currentPage;

    const response = await axiosInstance.get<SalaryInformationsState>("/salary", {
      params: {
        month,
        search: searchTerm,
        page: pageToUse,
      },
    });

    set({
      salaryInformations: response.data.data,
      totalEmployeeForSalary: response.data.total,
      fetched: searchTerm ? false : true,
    });

  } catch (err) {
    console.log("Error fetching salary information:", err);
  } finally {
    set({ isLoading: false });
  }
},

  // save the salary status in database
  addSalaryInformation: async (empId, status, month) => {
    const prevState = get().salaryInformations;

    // Optimistic update
    set((state) => ({
      salaryInformations: state.salaryInformations.map((emp) =>
        emp.empId === empId ? { ...emp, status } : emp
      ),
    }));

    try {
      const response = await axiosInstance.post<SalaryInformationsState>("/salary", {
        empId,
        status,
        month,
      });

      if (response.data.success) {
        set({ fetched: false });
      } else {
        //rollback
        set({ salaryInformations: prevState });
      }
    } catch (err) {
        //rollback
      set({ salaryInformations: prevState });
    //   console.log("Error saving salary info");
    }
  },
}));
