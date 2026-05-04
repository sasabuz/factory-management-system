"use client";

import { useState } from "react";
import AddExpenseButton from "./AddExpenseButton";
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from "@/components/ui/select";

interface HeaderProps{
  filter:string;
  setFilter:(val:string)=>void;
  setCurrentPage: (value: number) => void;
}

const ExpenseHeader = ({ filter, setFilter, setCurrentPage }:HeaderProps) => {

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Filter Dropdown */}
      <div className="w-44">
        <Select value={filter} onValueChange={(value) => { setFilter(value); setCurrentPage(1) }}>
          <SelectTrigger className="bg-white border border-gray-300 dark:text-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-400">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add Expense Button */}
      <AddExpenseButton />
    </div>
  );
};

export default ExpenseHeader;
