'use client'

import { useState } from "react"
import ProductTable from "./ProductsTable"
import ProductionPagination from "./ProductionPagination"
import InputField from "../InputField"
import AddNewProductButton from "./AddNewProductButton"

const ProductionBody = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
        {/* header */}
        <div className="flex gap-5">
          <InputField
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPage={setCurrentPage}
          ></InputField>
          <AddNewProductButton></AddNewProductButton>
        </div>
        
        {/* table body */}
        <div className="border border-border rounded">
            <ProductTable searchTerm={searchTerm || ""} pagination={currentPage}></ProductTable>
        </div>

        {/*Pagination*/}
        <div>
          {
            !searchTerm &&  <ProductionPagination currentPage={currentPage} setCurrentPage={setCurrentPage}></ProductionPagination>
          }
        </div>
    </div>
  )
}

export default ProductionBody