import ExpenseBody from "@/components/expensePage/ExpenseBody"

const expense = () => {
  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-semibold">Expenses</h1>
      
      {/* Body */}
      <ExpenseBody></ExpenseBody>
    </div>
  )
}

export default expense