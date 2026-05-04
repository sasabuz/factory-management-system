"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useEmployeeStore } from "@/stores/employeeStore";
import { useCallback, useEffect, useState } from "react";
import TableSkeleton from "../skeletons/TableSkeleton";
import UpdateEmployee from "./UpdateEmployee";
import DeleteEmployee from "./DeleteEmployee";
import { debounce } from "lodash";

const EmployeeTable = ({
  searchTerm,
  currentPage,
}: {
  searchTerm: string;
  currentPage: number;
}) => {
  const { employees, getAllEmployees, isLoading } = useEmployeeStore();

  const [firstLoad, setFirstLoad] = useState(true);
  const [pageChanging, setPageChanging] = useState(false);

  // debounce fetch
  const debouncedGetEmployees = useCallback(
    debounce(async (term: string, page: number) => {
      await getAllEmployees(term, page);
      setFirstLoad(false); // first fetch done
      setPageChanging(false);
    }, 500),
    [getAllEmployees]
  );

  useEffect(() => {
    if (!firstLoad) setPageChanging(true);
    debouncedGetEmployees(searchTerm, currentPage);
    return () => debouncedGetEmployees.cancel();
  }, [searchTerm, currentPage, debouncedGetEmployees]);

  // Skeleton loader logic
  const shouldSkeletonOpen =
    pageChanging || (employees.length === 0 && (firstLoad || isLoading));
  if (shouldSkeletonOpen) return <TableSkeleton />;

  if (!isLoading && employees.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        No employees found.
      </div>
    );
  }

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Employee Name</TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {employees.map((employee, index) => (
          <TableRow key={employee._id}>
            <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.salary}</TableCell>
            <TableCell>
              <UpdateEmployee empId={employee._id} />
            </TableCell>
            <TableCell>
              <DeleteEmployee empId={employee._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
