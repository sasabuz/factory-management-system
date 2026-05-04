"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import DeleteExpenseButton from "./DeleteExpenseButton";
import TableSkeleton from "../skeletons/TableSkeleton";

interface ExpenseData {
  _id?: string;
  name: string;
  description: string;
  date: string;
  amount: number;
}

interface ExpenseTableProps {
  expenses: ExpenseData[];
  isLoading: boolean;
  firstLoad:boolean;
}

const ExpenseTable = ({ expenses, isLoading, firstLoad }: ExpenseTableProps) => {

  const shouldSkeletonOpen = expenses.length===0 && (firstLoad || isLoading);

  if(shouldSkeletonOpen) return <TableSkeleton></TableSkeleton>

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Name & Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {expenses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 py-4">
              No expenses found
            </TableCell>
          </TableRow>
        ) : (
          expenses.map((exp, index) => (
            <TableRow key={exp._id || index}>
              <TableCell>{index + 1}</TableCell>

              <TableCell>
                <div className="font-semibold">{exp.name}</div>
                <div className="text-sm text-gray-500">{exp.description}</div>
              </TableCell>

              <TableCell>{exp.date}</TableCell>
              <TableCell>{exp.amount} TK</TableCell>

              <TableCell>
                <DeleteExpenseButton expId={exp._id || ""} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ExpenseTable;
