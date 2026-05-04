"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useProductStore } from "@/stores/productStore";
import { Loader2Icon } from "lucide-react";

const AddProductQuantity = ({ productId }: { productId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newQuantity, setNewQuantity] = useState<string>("");
  const [error, setError] = useState<String>("");
  const [success, setSuccess] = useState<String>("");
  const {
    product,
    isLoadingProductById,
    getProductById,
    updateProductQuantity,
    isUpdatingQuantity,
  } = useProductStore();

  const handleButtonClick = async () => {
    setError("");
    setSuccess("");
    setIsOpen(true);
    await getProductById(productId);
  };

  const handleAddQuantity = async () => {
    try {
      setError("");
      setSuccess("");
      const newNumber = Number(newQuantity);
      if (newNumber < 0 || !newNumber) {
        setError("Please enter a valid quantity greater than 0");
        return;
      }
      await updateProductQuantity(productId, newNumber);
      setNewQuantity("");
      setSuccess("Added Successfully!");
    } catch {
      setError("Something Went error!");
    }
  };

  return (
    <div>
      <Button
        className="dark:text-gray-300 hover: cursor-pointer bg-green-800 hover:bg-green-700"
        onClick={handleButtonClick}
        variant="default"
      >
        Add Quantity
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Product Quantity"
      >
        <div className="space-y-6">
          {isLoadingProductById ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading product...
            </p>
          ) : product ? (
            <div className="space-y-6">
              {/* Product Info Section */}
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
                    <span className="font-medium">Current Quantity:</span>{" "}
                    {product.quantity} Unit
                  </p>
                </div>
              </div>

              {/* Quantity Update Form */}
              <div className="space-y-3">
                <label
                  htmlFor="quantity"
                  className="block text-gray-800 dark:text-gray-200 font-medium"
                >
                  Add Quantity
                </label>
                <input
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                {error && <div className="text-sm text-red-500">{error}</div>}
                <Button
                  disabled={isUpdatingQuantity}
                  onClick={handleAddQuantity}
                  className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded-lg"
                >
                  {isUpdatingQuantity ? (
                    <div className="flex gap-2 items-center">
                      Saving{" "}
                      <Loader2Icon className="animate-spin"></Loader2Icon>
                    </div>
                  ) : (
                    <div>Save Quantity</div>
                  )}
                </Button>
                {/* Success Message */}
                <div>
                  {success && (
                    <div className="text-center text-sm text-green-600">
                      {success}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end">
                <Button
                  className="hover:cursor-pointer"
                  onClick={() => setIsOpen(false)}
                  variant="secondary"
                >
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

export default AddProductQuantity;
