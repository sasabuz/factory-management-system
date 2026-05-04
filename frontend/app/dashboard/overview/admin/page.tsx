import MonthExpenseCard from "@/components/overviewPage/MonthExpenseCard"
import MonthSales from "@/components/overviewPage/MonthSales"
import PendingSalaryCard from "@/components/overviewPage/PendingSalaryCard"
import PresentEmployees from "@/components/overviewPage/PresentEmployees"
import TodaySalesCard from "@/components/overviewPage/TodaySalesCard"
import TotalEmployeesCard from "@/components/overviewPage/TotalEmployeesCard"
import TotalStockCard from "@/components/overviewPage/TotalStockCard"

const adminPage = () => {
  return (
    <div className="grid gap-5">
      {/* row  1 */}
      <div className="grid grid-cols-3 gap-10">
        <TotalEmployeesCard></TotalEmployeesCard>
        <PresentEmployees></PresentEmployees>
        <PendingSalaryCard></PendingSalaryCard>
      </div>

      {/* row 2 */}
      <div className="row-span-2"> 
        <TotalStockCard></TotalStockCard>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-2 gap-10">
        <TodaySalesCard></TodaySalesCard>
        <MonthSales></MonthSales>
      </div>

      {/* Row 4 */}
      <div>
        <MonthExpenseCard></MonthExpenseCard>
      </div>
    </div>
  )
}

export default adminPage