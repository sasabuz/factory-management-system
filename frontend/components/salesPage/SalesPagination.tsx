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
  totalItems: number;
  itemsPerPage?: number;
}

const SalesPagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage = 10,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-5 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} />
          </PaginationItem>

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-green-700 text-white hover:text-white hover:bg-green-500"
                    : "bg-white text-gray-700 hover:bg-gray-300 border"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default SalesPagination;
