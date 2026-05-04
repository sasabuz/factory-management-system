"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useProductStore } from "@/stores/productStore";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { useSalesStore } from "@/stores/salesStore";
import Link from "next/link";

const sales = ({ productId }: { productId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<string>("");
  const [error, setError] = useState<String>("");
  const [success, setSuccess] = useState<String>("");
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [buyerName, setBuyerName] = useState("");
  const [buyerMobile, setBuyerMobile] = useState("");
  const [navigateButton, setNavigateButton] = useState(false);

  const { product, isLoadingProductById, getProductById } = useProductStore();

  const { addNewSale, isAddingSale } = useSalesStore();

  const handleButtonClick = async () => {
    setIsOpen(true);
    await getProductById(productId);
  };

  const handleAddSale = async () => {
    setSuccess("");
    setError("");

    const salesNum = Number(quantity);

    // quantity validation
    if (!salesNum || salesNum <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    // stock check
    if (product && product.quantity < salesNum) {
      setError("Not enough stock!");
      return;
    }

    // buyer name required
    if (!buyerName.trim()) {
      setError("Buyer name is required.");
      return;
    }

    // mobile number validation (BD format)
    const mobileRegex = /^01[3-9][0-9]{8}$/;

    if (!mobileRegex.test(buyerMobile)) {
      setError("Please enter a valid Bangladeshi mobile number.");
      return;
    }

    // calculate total price
    const totalPrice = salesNum * (product?.price || 0);

    // formData to send to backend
    const formData = {
      productId,
      productName: product?.name || "",
      unit: salesNum,
      totalPrice,
      buyerName,
      buyerMobileNumber: buyerMobile,
    };

    try {
      await addNewSale(formData);
      setSuccess("Sales added successfully!");
      setQuantity("");
      setBuyerName("");
      setBuyerMobile("");
      setCalculatedPrice(0);
      setNavigateButton(true);
    } catch (err) {
      setNavigateButton(false);
      setError("An error occurred while saving the sale.");
    }
  };

  const handleInputOnchange = (e: any) => {
    setQuantity(e.target.value);
    const tempNum = Number(e.target.value);
    if (product) setCalculatedPrice(tempNum * product?.price);
  };

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        className=" dark:text-gray-300 hover: cursor-pointer bg-blue-800 hover:bg-blue-700"
      >
        Add Sales
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Sale">
        <div className="space-y-6">
          {isLoadingProductById ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading product...
            </p>
          ) : product ? (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Product Information
                </h3>
                <div className="grid grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Name:</span> {product.name}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> {product.price}{" "}
                    BDT
                  </p>
                  <p>
                    <span className="font-medium">Unit:</span> {product.unit}
                  </p>
                  <p>
                    <span className="font-medium">Available Quantity:</span>{" "}
                    {product.quantity} Unit
                  </p>
                </div>
              </div>

              {/* Quantity Input */}
              <div className="space-y-3">
                <label
                  htmlFor="quantity"
                  className="block text-gray-800 dark:text-gray-200 font-medium"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleInputOnchange}
                  placeholder="Enter quantity to sell"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <label className="block font-medium">Buyer Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter buyer name"
                  className="w-full rounded-lg border p-2"
                />

                <label className="block font-medium">Buyer Mobile</label>
                <input
                  type="text"
                  value={buyerMobile}
                  onChange={(e) => setBuyerMobile(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full rounded-lg border p-2"
                />

                {calculatedPrice > 0 && (
                  <p className="text-gray-700 dark:text-gray-300">
                    Total Price:{" "}
                    <span className="font-semibold">{calculatedPrice} BDT</span>
                  </p>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                  disabled={isAddingSale}
                  onClick={handleAddSale}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg"
                >
                  {isAddingSale ? (
                    <div className="flex gap-2 items-center">
                      Saving <Loader2Icon className="animate-spin" />
                    </div>
                  ) : (
                    "Save sales"
                  )}
                </Button>

                {success && (
                  <p className="text-green-600 text-sm text-center">
                    {success}
                  </p>
                )}
                {navigateButton && (
                  <Link href="/dashboard/sales" className="flex items-center hover:cursor-pointer text-center text-blue-500">
                    <ArrowRight /> <span className="underline font-semibold">Show all sales</span>
                  </Link>
                )}
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <Button onClick={() => setIsOpen(false)} variant="secondary">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-red-500">Product not found!</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default sales;
