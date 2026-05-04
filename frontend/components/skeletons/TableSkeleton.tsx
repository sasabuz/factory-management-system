"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const TableSkeleton = () => {
  const rows = Array(7).fill(0);

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <>
          {[...Array(rows)].map((_, index) => (
            <TableRow key={index}>
              {[...Array(7)].map((_, i) => (
                <TableCell key={i} className="py-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </>
      </TableHeader>
      <TableBody>
        {rows.map((_, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
