"use client"
import { useState } from "react";
import AttendanceTable from "./AttendanceTable";
import InputField from "../InputField";
import AttendancePagination from "./AttendancePagination";

const AttendanceBody = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>

      {/* Table */}
      <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* Header */}
        <InputField searchTerm={searchTerm || ""} setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage}></InputField>
        
        {/* Table */}
        <div className="border border-border rounded">
          <AttendanceTable searchTerm={searchTerm} currentPage={currentPage}></AttendanceTable>
        </div>

        {/* Pagination */}
        <div>
          {!searchTerm &&
          <AttendancePagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></AttendancePagination>
          }
        </div>
      </div>
    </div>
  );
};

export default AttendanceBody;
