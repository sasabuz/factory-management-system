"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useProductStore } from "@/stores/productStore";
import { Loader2Icon } from "lucide-react";

const Update = ({ productId }: { productId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    product,
    isLoadingProductById,
    getProductById,
    updateProduct,
    isUpdatingProduct,
  } = useProductStore();

  // fetching prodcut data
  const handleButtonClick = async () => {
    setError("");
    setSuccess("");
    setIsOpen(true);
    await getProductById(productId);
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Product update handler
  const handleUpdate = async () => {
    try {
      setError("");
      setSuccess("");

      const dataToUpdate = {
        ...product,
        ...formData,
      };

      // Validation
      if (!dataToUpdate.name || typeof dataToUpdate.name !== "string") {
        setError("Name is required and must be a string!");
        return;
      }

      if (
        dataToUpdate.price === undefined ||
        dataToUpdate.price === null ||
        Number(dataToUpdate.price)<0
      ) {
        setError("Price is required and must be a valid number!");
        return;
      } else {
        // Ensure price is a number
        dataToUpdate.price = Number(dataToUpdate.price);
      }

      if (!dataToUpdate.unit || typeof dataToUpdate.unit !== "string") {
        setError("Unit is required and must be a string!");
        return;
      }

      await updateProduct(productId, dataToUpdate);

      setSuccess("Product updated successfully!");
    } catch {
      setError("Something went wrong while updating!");
    }
  };

  return (
    <div>
      <Button
        className="hover:cursor-pointer bg-orange-500 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-600 text-white"
        onClick={handleButtonClick}
      >
        Update
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Product"
      >
        <div className="space-y-6">
          {isLoadingProductById ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading product...
            </p>
          ) : product ? (
            <div className="space-y-5">
              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 font-medium">
                    Name
                  </label>
                  <input
                    name="name"
                    defaultValue={product.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2"
                    placeholder="Enter product name"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 font-medium">
                    Price (BDT)
                  </label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={product.price}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2"
                    placeholder="Enter price"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 font-medium">
                    Unit
                  </label>
                  <input
                    name="unit"
                    defaultValue={product.unit}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-2"
                    placeholder="Enter unit (e.g., kg, pcs)"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 font-medium">
                    Quantity
                  </label>
                  <input
                    value={product.quantity}
                    disabled
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 p-2 cursor-not-allowed"
                  />
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}
                {success && (
                  <div className="text-sm text-green-600 text-center font-medium">
                    {success}
                  </div>
                )}

                {/* Update Button */}
                <Button
                  disabled={isUpdatingProduct}
                  onClick={handleUpdate}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg"
                >
                  {isUpdatingProduct ? (
                    <div className="flex gap-2 items-center">
                      Updating <Loader2Icon className="animate-spin" />
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>

                {/* Close Button */}
                <div className="flex justify-end">
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    className="mt-2"
                  >
                    Close
                  </Button>
                </div>
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

export default Update;
