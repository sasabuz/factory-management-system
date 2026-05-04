"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import TableSkeleton from "../skeletons/TableSkeleton";
import DeleteSales from "./DeleteSales";
import DownloadReceipt from "./DownloadReceipt";

export interface SaleItem {
  _id: string;
  productName: string;
  unit: number;
  totalPrice: number;
  buyerName: string;
  buyerMobileNumber: string;
  soldAt: string;
}

interface SalesTableProps {
  sales: SaleItem[];
  isLoading: boolean;
  firstLoad: boolean;
  currentPage:number;
}

const SalesTable = ({ currentPage, sales, isLoading, firstLoad }: SalesTableProps) => {
  const shouldSkeletonOpen = sales.length === 0 && (firstLoad || isLoading);
  if (shouldSkeletonOpen) return <TableSkeleton />;

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Buyer Name</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Sold Date</TableHead>
          <TableHead>Delete</TableHead>
          <TableHead>Recipt</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-semibold">
        {sales.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500 py-4">
              No sales found
            </TableCell>
          </TableRow>
        ) : (
          sales.map((sale, index) => (
            <TableRow key={sale._id}>
              <TableCell>{((currentPage-1)*10) + index + 1}</TableCell>
              <TableCell>{sale.productName}</TableCell>
              <TableCell>
                <div className="font-semibold">{sale.buyerName}</div>
                <div className="text-sm text-gray-500">{sale.buyerMobileNumber}</div>
              </TableCell>
              <TableCell>{sale.unit}</TableCell>
              <TableCell>{sale.totalPrice} TK</TableCell>
              <TableCell>{new Date(sale.soldAt).toLocaleDateString()}</TableCell>
              <TableCell> <DeleteSales saleId = {sale._id}></DeleteSales> </TableCell> 
              <TableCell> <DownloadReceipt  sale={sale}></DownloadReceipt> </TableCell> 
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default SalesTable;
