"use client";

import { useState } from "react";
import SalaryTable from "./SalaryTable";
import InputField from "../InputField";
import SalaryMonthBadge from "./SalaryMonthBadge";
import SalaryPagination from "./SalaryPagination";

const SalaryBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div>
      {/* Table */}
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <div className="flex gap-5">
          <InputField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          ></InputField>
          <SalaryMonthBadge></SalaryMonthBadge>
        </div>

        {/* Table */}
        <div className="border border-border rounded">
          <SalaryTable searchTerm={searchTerm} currentPage={currentPage} />
        </div>

        {/* Pagination */}
        <div>
          {!searchTerm && (
            <SalaryPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></SalaryPagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryBody;
