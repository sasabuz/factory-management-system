"use client";

import { Plus, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Modal from "../ui/modal";
import { useAuthStore } from "@/stores/authStore";

const AddEmployeeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    salary: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // call the store
  const { signup } = useAuthStore();

  const openModal = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      salary: "",
    });
  };

  //hanlde onchange
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add employee button
  const handleAddEmployeeButton = async (e: any) => {
    //initial validation check:
    e.preventDefault();
    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const role = formData.role.trim();
    const salary = Number(formData.salary);

    // Email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.length < 3) {
      setError("Employee name must be at least 3 characters long.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    if (salary <= 0) {
      setError("Please enter a valid salary.");
      return;
    }

    const signupData = {
      ...formData,
      salary: Number(formData.salary),
    };

    // Now all data is ready to save database:
    const response = await signup(signupData);
    if (response?.success) {
      setSuccess(response?.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        salary: "",
      });
    } else {
      setError(response?.message || "");
    }
  };

  return (
    <div className="flex-1">
      <div className="flex gap-5">
        {/* button & modal */}
        <div className="w-1/6">
          <Button
            onClick={openModal}
            className="bg-green-800 text-md text-white hover:bg-green-700 py-5 flex items-center gap-2"
          >
            <Plus />
            Add New Employee
          </Button>

          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Add New Employee"
          >
            <div className="space-y-4">
              {/* Employee Name */}
              <span className="font-semibold">Employee Name</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                placeholder="Employee Name"
                className="w-full border rounded p-2"
              />

              {/* Email */}
              <span className="font-semibold">Email</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleOnChange}
                placeholder="Email"
                className="w-full border rounded p-2"
              />

              {/* Password with eye toggle */}
              <span className="font-semibold">Password</span>
              <div className="relative">
                <input
                  value={formData.password}
                  onChange={handleOnChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border rounded p-2 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Select Role */}
              <span className="font-semibold">Select Role</span>
              <select
                value={formData.role}
                onChange={handleOnChange}
                name="role"
                className="w-full border rounded p-2 bg-white"
              >
                <option value="" disabled>
                  Choose Role
                </option>
                <option value="manager">Manager</option>
                <option value="accountant">Accountant</option>
                <option value="worker">Worker</option>
              </select>

              {/* Salary */}
              <span className="font-semibold">Salary</span>
              <input
                value={formData.salary}
                onChange={handleOnChange}
                name="salary"
                type="number"
                placeholder="Salary (BDT)"
                className="w-full border rounded p-2"
              />

              {/* show error */}
              <div>
                {error && <div className="text-red-500 text-md">{error}</div>}
                {success && (
                  <div className="text-green-500 text-md">{success}</div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  onClick={handleAddEmployeeButton}
                  className="bg-green-700 hover:bg-green-600 text-white"
                >
                  Add Employee
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

export default AddEmployeeButton;
