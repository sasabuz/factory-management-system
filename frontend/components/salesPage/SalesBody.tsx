"use client";

import { useEffect, useState } from "react";
import SalesHeader from "./SalesHeader";
import SalesTable, { SaleItem } from "./SalesTable";
import SalesPagination from "./SalesPagination";
import { useSalesStore } from "@/stores/salesStore";

const SalesBody = () => {
  const { sales, isLoadingSales, getAllSales } = useSalesStore();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      await getAllSales();
      setFirstLoad(false);
    };
    fetchSales();
  }, []);

  const mappedSales: SaleItem[] = sales.map((s) => ({
  _id: s._id,
  productName: s.productName,
  unit: s.unit,
  totalPrice: s.totalPrice,
  buyerName: s.buyerName,
  buyerMobileNumber: s.buyerMobileNumber,
  soldAt: s.soldAt,
}));
  const filteredSales = mappedSales.filter((sale) => {
    const now = new Date();
    const soldDate = new Date(sale.soldAt);

    if (filter === "all") return true;
    if (filter === "today") return soldDate.toDateString() === now.toDateString();
    if (filter === "week") return now.getTime() - soldDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
    if (filter === "month") return soldDate.getMonth() === now.getMonth() && soldDate.getFullYear() === now.getFullYear();
    if (filter === "year") return soldDate.getFullYear() === now.getFullYear();
    return true;
  });

  const itemsPerPage = 10;
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
      <SalesHeader filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage} />

      <div className="border border-border rounded">
        <SalesTable currentPage={currentPage} sales={paginatedSales} isLoading={isLoadingSales} firstLoad={firstLoad} />
      </div>

      {filteredSales.length > 0 && (
        <SalesPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalItems={filteredSales.length}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default SalesBody;
