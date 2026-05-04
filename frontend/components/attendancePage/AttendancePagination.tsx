"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaginationSkeleton from "../skeletons/PaginationSkeleton";
import { useAttendanceStore } from "@/stores/attendanceStore";

interface pageNationProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const AttendancePagination = ({ currentPage, setCurrentPage }: pageNationProps) => {
  const { total, fetched, isLoading } = useAttendanceStore();

  const totalEmployees = total;
  const limit = 10;
  const totalPages = Math.ceil(totalEmployees / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Skeleton show condition
  const shouldShowSkeleton = totalEmployees === 0 && (isLoading || !fetched);
  if(shouldShowSkeleton) return <PaginationSkeleton></PaginationSkeleton>

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

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 hover:cursor-pointer rounded transition-colors duration-200 ${
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

export default AttendancePagination;
