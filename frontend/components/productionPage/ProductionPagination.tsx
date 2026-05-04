"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProductStore } from "@/stores/productStore";
import PaginationSkeleton from "../skeletons/PaginationSkeleton";

interface PageProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  itemsPerPage?: number;
}

const ProductionPagination = ({
  currentPage,
  setCurrentPage,
  itemsPerPage = 5,
}: PageProps) => {
  const { products, isLoading, total } = useProductStore();

  if (isLoading || !products) return <PaginationSkeleton></PaginationSkeleton>;

  if (products.length === 0) return null;

  const totalPages = Math.ceil(total / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-5 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={`px-3 py-1 rounded transition-colors duration-200
    ${
      currentPage === page
        ? "bg-green-700 text-white hover:text-white hover:bg-green-500 dark:hover:bg-green-500"
        : "bg-white text-gray-700 hover:bg-gray-300 border"
    }`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductionPagination;