'use client'
import { useEffect, useState } from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseTable from "./ExpenseTable";
import ExpensePagination from "./ExpensePagination";
import { useExpenseStore } from "@/stores/expenseStore";

const ExpenseBody = () => {
  const { isLoading, expenses, getExpenses } = useExpenseStore();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [firstLoad, setFirstLoad] = useState(true);

  // Fetch expenses on mount
  useEffect(() => {
    const fetchExpenses = async() =>{
      await getExpenses();
    } 
    fetchExpenses();
    setFirstLoad(false);
  }, []);

  // Filtered expenses
  const filteredExpenses = expenses.filter((exp) => {
    const now = new Date();
    const expDate = new Date(exp.date);

    if (filter === "all") return true;
    if (filter === "today") return expDate.toDateString() === now.toDateString();
    if (filter === "week") return now.getTime() - expDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
    if (filter === "month") return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
    if (filter === "year") return expDate.getFullYear() === now.getFullYear();

    return true;
  });

  const itemsPerPage = 10;
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="border-2 border-border rounded p-10 mt-5 space-y-10">
      <ExpenseHeader filter={filter} setFilter={setFilter} setCurrentPage={setCurrentPage} />
      <div className="border border-border rounded">
        <ExpenseTable isLoading={isLoading} expenses={paginatedExpenses} firstLoad={firstLoad}/>
      </div>
      <ExpensePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={filteredExpenses.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default ExpenseBody;
