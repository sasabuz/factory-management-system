import MonthExpenseCard from "@/components/overviewPage/MonthExpenseCard";
import PendingSalaryCard from "@/components/overviewPage/PendingSalaryCard";
import MonthSales from "@/components/overviewPage/MonthSales";
import TodaySalesCard from "@/components/overviewPage/TodaySalesCard";
import TotalStockCard from "@/components/overviewPage/TotalStockCard";

const AccountantPage = () => {
  return (
    <div className="grid gap-5">

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-10">
        <PendingSalaryCard />
        <TodaySalesCard />
        <MonthSales />
      </div>

      {/* Row 2 */}
      <div>
        <MonthExpenseCard />
      </div>

      {/* Row 3 */}
      <div>
        <TotalStockCard />
      </div>
      
    </div>
  );
};

export default AccountantPage;
