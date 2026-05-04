"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


interface PaginationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  totalItems: number; // Total items (employees/expenses)
  itemsPerPage?: number; // Optional, default 10
  isLoading?: boolean;
}

const ExpensePagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage = 10,
}: PaginationProps) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (totalPages === 0) return null;

  return (
    <div className="mt-5 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-green-700 text-white hover:text-white hover:bg-green-500 dark:hover:bg-green-500"
                    : "bg-white text-gray-700 hover:bg-gray-300 border"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ExpensePagination;
