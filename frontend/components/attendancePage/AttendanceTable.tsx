// components/tables/AttendanceTable.tsx

"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAttendanceStore } from "@/stores/attendanceStore";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import TableSkeleton from "../skeletons/TableSkeleton";

interface AttendanceTableProps {
  searchTerm: string;
  currentPage: number;
}

// get local date
const getLocalISODate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const AttendanceTable = ({ searchTerm, currentPage }: AttendanceTableProps) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [pageChanging, setPageChanging] = useState(false);
  const [today, setToday] = useState(getLocalISODate());

  const { attendances, isLoading, getAllAttendance, updateAttendance } =
    useAttendanceStore();

  // automatic date update after 12am
  useEffect(() => {
    const now = new Date();
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    const timeUntilMidnight = nextDay.getTime() - now.getTime() + 1000;

    const timeoutId = setTimeout(() => {
      setToday(getLocalISODate());
      const intervalId = setInterval(() => {
        setToday(getLocalISODate());
      }, 60000);
      return () => clearInterval(intervalId);
    }, timeUntilMidnight);

    return () => clearTimeout(timeoutId);
  }, []);

  // Debounced fetch for attendance data
  const debouncedGetAttendance = useCallback(
    debounce(async (date: string, term: string, page: number) => {
      await getAllAttendance(date, term, page);
      setPageChanging(false);
      setFirstLoad(false);
    }, 500),
    [getAllAttendance]
  );

  useEffect(() => {
    if (!firstLoad) setPageChanging(true);
    debouncedGetAttendance(today, searchTerm, currentPage);
    return () => debouncedGetAttendance.cancel();
  }, [searchTerm, currentPage, debouncedGetAttendance, today]);

  // Handle toggle change
  const handleAttendanceChange = (
    employeeId: string,
    status: "present" | "absent" | "leave"
  ) => {
    if (status) {
      updateAttendance(employeeId, status, today);
    }
  };

  // Skeleton loader logic
  const shouldSkeletonOpen =
    pageChanging || (attendances.length === 0 && (firstLoad || isLoading));
  if (shouldSkeletonOpen) return <TableSkeleton />;

  // No data found message
  if (!isLoading && attendances.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        No employees found.
      </div>
    );
  }

  return (
    <Table className="min-w-[600px] border">
      <TableHeader className="">
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>
            Status <div className="text-xs text-gray-400">{today}</div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {attendances.map((emp, index) => (
          <TableRow key={emp._id}>
            <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.role}</TableCell>
            <TableCell>{emp.email}</TableCell>

            <TableCell>
              <ToggleGroup
                type="single"
                className="border-2"
                value={
                  emp.status === "absent"
                    ? "A"
                    : emp.status === "present"
                    ? "P"
                    : emp.status === "leave"
                    ? "L"
                    : "A"
                }
                onValueChange={(value) => {
                  if (value === "A")
                    handleAttendanceChange(emp.empId, "absent");
                  if (value === "P")
                    handleAttendanceChange(emp.empId, "present");
                  if (value === "L") handleAttendanceChange(emp.empId, "leave");
                }}
              >
                <ToggleGroupItem
                  value="A"
                  className="data-[state=on]:bg-red-500 data-[state=on]:text-white"
                >
                  A
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="P"
                  className="data-[state=on]:bg-green-500 data-[state=on]:text-white"
                >
                  P
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="L"
                  className="data-[state=on]:bg-blue-500 data-[state=on]:text-white"
                >
                  L
                </ToggleGroupItem>
              </ToggleGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
