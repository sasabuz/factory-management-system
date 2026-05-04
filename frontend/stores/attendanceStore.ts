import { create } from "zustand";
import axiosInstance from "@/lib/api";

interface AttendanceState {
  _id?: string;
  name: string;
  email: string;
  empId: string;
  status: string;
  role: string;
}

interface AttendanceResponse {
  success: boolean;
  message?: string;
  data: AttendanceState[];
  total: number;
}

interface AttendanceStoreState {
  attendances: AttendanceState[];
  isLoading: boolean;
  fetched: boolean;
  total: number;
  updateAttendance: (
    employeeId: string,
    status: "present" | "absent" | "leave",
    date: string
  ) => Promise<void>;
  getAllAttendance: (
    date: string,
    search: string,
    currentPage: number
  ) => Promise<void>;
}

export const useAttendanceStore = create<AttendanceStoreState>((set, get) => ({
  attendances: [],
  isLoading: false,
  fetched: false,
  total: 0,

  // get all attendance for specific date
  getAllAttendance: async (date, search = "", currentPage = 1) => {
    const { fetched } = get();

    if (!search && fetched) {
      // already fetched
    } else {
      set({ isLoading: true });
    }

    try {
      const pageToUse = search ? 1 : currentPage;

      const response = await axiosInstance.get<AttendanceResponse>(
        "/attendance",
        {
          params: { date, search, page: pageToUse },
        }
      );

      set({
        attendances: response.data.data.map((a) => ({
          ...a,
          status: a.status || "absent",
        })),
        total: response.data.total,
        fetched: search ? false : true,
      });
    } catch (err) {
      console.error("Error fetching attendances:", err);
    } finally {
      set({ isLoading: false });
    }
  },

  // single employee attendance
  updateAttendance: async (empId, status, date) => {
    const prevState = get().attendances;
    // optimistic update
    set((state) => ({
      attendances: state.attendances.map((a) =>
        a.empId === empId ? { ...a, status } : a
      ),
    }));

    try {
      const res = await axiosInstance.post<AttendanceResponse>(
        "/attendance/update",
        {
          empId,
          status,
          date,
        }
      );

      if (!res.data.success) {
        set({ attendances: prevState }); // rollback
      }
    } catch (err: any) {
      set({ attendances: prevState }); // rollback
      console.error(err.response?.data || err.message);
    }
  },
}));
