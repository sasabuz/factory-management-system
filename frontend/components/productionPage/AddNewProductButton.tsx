"use client";

import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Modal from "../ui/modal";
import { useProductStore } from "@/stores/productStore";


const AddNewProductButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit: "",
    price: "",
    quantity: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { addProduct, isAdding } = useProductStore();


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = () => {
    setError("");
    setSuccess("");
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    // Validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.unit ||
      !formData.price
    ) {
      setError("All fields are required!");
      return;
    }
    if (formData.name.length < 5) {
      setError("The length of product name must be greater than 5 char.");
      return;
    }

    if (formData.description.length < 10) {
      setError(
        "The length of product description must be greater than 10 char."
      );
      return;
    }

    if (Number(formData.price) < 1) {
      setError("The product price must be greater than 0");
      return;
    }

    if (Number(formData.quantity) < 0 || isNaN(Number(formData.quantity))) {
      setError("The product quantity must be a valid number.");
    }

    try {
      await addProduct({
        name: formData.name,
        description: formData.description,
        unit: formData.unit,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        image: "",
      });
      setSuccess("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        unit: "",
        price: "",
        quantity: 0,
      });
    } catch {
      setError("Something went wrong while adding product!");
    }
  };

  return (
    <div className="flex-1">
      <div className="flex gap-5">
        <div className="w-1/6">
          <Button
            onClick={openModal}
            className="bg-green-800 text-md text-white hover:bg-green-700 py-5 flex items-center gap-2"
          >
            <Plus />
            Add New Product Item
          </Button>

          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Add New Product"
          >
            <div className="space-y-4">
              <span className="font-semibold">Product Name</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full border rounded p-2"
              />
              <span className="font-semibold">Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border rounded p-2"
              />
              <span className="font-semibold">Unit</span>
              <input
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Unit (e.g., kg, pcs)"
                className="w-full border rounded p-2"
              />
              <span className="font-semibold">Price</span>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price (BDT)"
                className="w-full border rounded p-2"
              />
              <span className="font-semibold">Quantity</span>
              <input
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="w-full border rounded p-2"
              />

              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}

              <div className="flex justify-end gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={isAdding}
                  className="bg-green-700 hover:bg-green-600 text-white"
                >
                  {isAdding ? "Adding..." : "Add Product"}
                </Button>
                <Button onClick={() => setIsOpen(false)} variant="secondary">
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddNewProductButton;
