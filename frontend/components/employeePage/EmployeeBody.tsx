"use client";
import { useState } from "react";
import EmployeeHeader from "./AddEmployeeButton";
import EmployeeTable from "./EmployeeTable";
import PaginationPage from "../Pagination";
import InputField from "../InputField";
import AddEmployeeButton from "./AddEmployeeButton";

const EmployeeBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div>
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <div className="flex gap-5">
          <InputField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          ></InputField>
          <AddEmployeeButton></AddEmployeeButton>
        </div>

        {/* Table */}
        <div className="border border-border rounded">
          <EmployeeTable
            searchTerm={searchTerm || ""}
            currentPage={currentPage}
          ></EmployeeTable>
        </div>

        {/* Pagination */}
        <div>
          {!searchTerm && (
            <PaginationPage
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></PaginationPage>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeBody;
