import Production from "../production/production.model";
import Sale from "./sales.model";

interface SalePayload {
  productId: string;
  productName: string;
  unit: number;
  totalPrice: number;
  buyerName: string;
  buyerMobileNumber: string;
}

// get all sales
export const getAllSales = async()=>{
  const data = await Sale.find().sort({createdAt:-1});
  const total = await Sale.countDocuments();
  return {data, total};
}

// add sales
export const addSales = async (payload: SalePayload) => {
  const { productId, productName, unit, totalPrice, buyerName, buyerMobileNumber } = payload;

  // find product
  const product = await Production.findById(productId);
  if (!product) throw new Error("Product not found!");

  // check stock
  if (product.quantity < unit) {
    throw new Error("Insufficient stock to complete sale!");
  }

  // update product quantity
  product.quantity -= unit;
  await product.save();

  // create sale record
  const sale = new Sale({
    productId,
    productName,
    unit,
    totalPrice,
    buyerName,
    buyerMobileNumber,
  });

  await sale.save();

  return sale; // return the saved sale
};


//delete sales
export const deleteSale =async(saleId:string)=>{
  await Sale.findByIdAndDelete(saleId);
}