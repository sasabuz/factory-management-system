"use client";

import { useEffect } from "react";
import { useOverviewStore } from "@/stores/overviewStore";
import { Loader2 } from "lucide-react";
import React from "react";
import TotalStockCardSkeleton from "../skeletons/TotalStockSkeleton";

const TotalStockCard = () => {
  const { products, gettingProducts, getProductsStock } = useOverviewStore();

  useEffect(() => {
    getProductsStock();
  }, [getProductsStock]);


  const shouldOpenSkeleton = products === null || gettingProducts;
  if(shouldOpenSkeleton) return <TotalStockCardSkeleton></TotalStockCardSkeleton>

  return (
    <div className="
      p-5 rounded-xl border
      bg-white dark:bg-[#0f1115]
      border-gray-200 dark:border-gray-800
      shadow-sm hover:shadow-md hover:-translate-y-0.5
      transition-all duration-300
    ">
      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
        Total Stock
      </h2>

      {/* PRODUCT LIST */}
      {gettingProducts ? (
        <div className="flex justify-center py-5">
          <Loader2 className="animate-spin text-green-500" size={26} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 text-gray-800 dark:text-gray-100">
          <span className="font-semibold">Product Name</span>
          <span className="font-semibold text-right">Quantity</span>

          {products.map((product, idx) => (
            <React.Fragment key={idx}>
              <span>{product.name}</span>
              <span className="text-right">{product.quantity}</span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default TotalStockCard;
