import ProductionBody from "@/components/productionPage/ProductionBody";

const production = async () => {
  return (
    <div className="">
      {/* Header */}
      <h1 className="text-2xl font-semibold">All Production</h1>
      
      {/* Body */}
      <ProductionBody></ProductionBody>
      
    </div>
  );
};

export default production;
