import TotalEmployeesCard from "@/components/overviewPage/TotalEmployeesCard";
import PresentEmployees from "@/components/overviewPage/PresentEmployees";
import TodaySalesCard from "@/components/overviewPage/TodaySalesCard";
import MonthSales from "@/components/overviewPage/MonthSales";
import TotalStockCard from "@/components/overviewPage/TotalStockCard";

const ManagerPage = () => {
  return (
    <div className="grid gap-5">

      {/* Row 1 */}
      <div className="grid grid-cols-3 gap-10">
        <TotalEmployeesCard />
        <PresentEmployees />
        <TodaySalesCard />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-2 gap-10">
        <MonthSales />
        <TotalStockCard />
      </div>

    </div>
  );
};

export default ManagerPage;
