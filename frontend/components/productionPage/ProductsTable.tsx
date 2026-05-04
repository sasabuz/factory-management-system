"use client";

import { debounce } from "lodash";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useProductStore } from "@/stores/productStore";
import { useCallback, useEffect, useState } from "react";
import TableSkeleton from "../skeletons/TableSkeleton";
import AddProductQuantity from "./AddProductQuantity";
import DeleteProductItem from "./DeleteProductItem";
import Sales from "./Sales";
import Update from "./Update";

const ProductTable = ({
  searchTerm,
  pagination,
}: {
  searchTerm: string;
  pagination: number;
}) => {
  const { products, isLoading, getProducts } = useProductStore();
  const [firstLoad, setFirstLoad] = useState(true);
  const [pageChanging, setPageChanging] = useState(false);

  // console.log(searchTerm, pagination);
  const debouncedGetProducts = useCallback(
    debounce((searchTerm: string, pagination: number) => {
      getProducts(searchTerm, pagination);
      setFirstLoad(false);
      setPageChanging(false);
    }, 500),
    [getProducts]
  );

  useEffect(() => {
    if (!firstLoad) setPageChanging(true);
    debouncedGetProducts(searchTerm, pagination);
    // cleanup
    return () => debouncedGetProducts.cancel();
  }, [searchTerm, pagination, debouncedGetProducts]);

  // Skeleton loader logic
  const shouldSkeletonOpen =
    pageChanging || (products.length === 0 && (firstLoad || isLoading));
  if (shouldSkeletonOpen) return <TableSkeleton />;


  //not found
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        No products found.
      </div>
    );
  }

  return (
    <Table className="min-w-[600px]">
      <TableHeader>
        <TableRow>
          <TableHead>Serial</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Productions</TableHead>
          <TableHead>Sales</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Delete Item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-semibold">
        {products.map((product, indx) => (
          <TableRow key={product._id}>
            <TableCell>{(pagination - 1) * 10 + indx + 1}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>BDT {product.price}</TableCell>
            <TableCell>{product.unit}</TableCell>
            <TableCell>{product.quantity} Unit</TableCell>
            <TableCell>
              <AddProductQuantity
                productId={product._id || ""}
              ></AddProductQuantity>
            </TableCell>
            <TableCell>
              {" "}
              <Sales productId={product._id || ""}></Sales>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <Update productId={product._id || ""}></Update>
            </TableCell>
            <TableCell>
              <DeleteProductItem
                productId={product._id || ""}
              ></DeleteProductItem>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
