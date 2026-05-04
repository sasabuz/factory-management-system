"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useEmployeeStore } from "@/stores/employeeStore";
import { Loader2Icon } from "lucide-react";

const UpdateEmployee = ({ empId }: { empId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    employee,
    isLoadingEmployeeById,
    getEmployeeById,
    updateEmployee,
    isUpdatingEmployee,
  } = useEmployeeStore();

  // Fetch employee data
  const handleButtonClick = async () => {
    setError("");
    setSuccess("");
    setIsOpen(true);
    await getEmployeeById(empId);
  };

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update handler
  const handleUpdate = async () => {
    try {
      setError("");
      setSuccess("");

      const dataToUpdate = {
        ...employee,
        ...formData,
      };

      // Validation
      if (!dataToUpdate.name || typeof dataToUpdate.name !== "string") {
        setError("Name is required and must be a string!");
        return;
      }

      if (!dataToUpdate.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataToUpdate.email)) {
        setError("Valid email is required!");
        return;
      }

      if (!dataToUpdate.role || typeof dataToUpdate.role !== "string") {
        setError("Role is required!");
        return;
      }

      if (
        dataToUpdate.salary === undefined ||
        dataToUpdate.salary === null ||
        Number(dataToUpdate.salary) < 0
      ) {
        setError("Salary must be a valid positive number!");
        return;
      } else {
        dataToUpdate.salary = Number(dataToUpdate.salary);
      }

      await updateEmployee(empId, dataToUpdate);
      setSuccess("Employee updated successfully!");
    } catch {
      setError("Something went wrong while updating employee!");
    }
  };

  return (
    <div>
      <Button
        className="bg-yellow-600 hover:bg-yellow-500 text-white"
        onClick={handleButtonClick}
      >
        Update
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Update Employee"
      >
        <div className="space-y-6">
          {isLoadingEmployeeById ? (
            <p className="text-center text-gray-500">Loading employee...</p>
          ) : employee ? (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-medium">Name</label>
                <input
                  name="name"
                  defaultValue={employee.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter employee name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={employee.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter email address"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block font-medium">Role</label>
                <select
                  name="role"
                  defaultValue={employee.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="">Select role</option>
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="supervisor">Supervisor</option>
                </select>
              </div>

              {/* Salary */}
              <div>
                <label className="block font-medium">Salary (BDT)</label>
                <input
                  name="salary"
                  type="number"
                  defaultValue={employee.salary}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Enter salary"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              {/* Update Button */}
              <Button
                disabled={isUpdatingEmployee}
                onClick={handleUpdate}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white"
              >
                {isUpdatingEmployee ? (
                  <div className="flex gap-2 items-center">
                    Updating <Loader2Icon className="animate-spin" />
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>

              {/* Close */}
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
          ) : (
            <p className="text-center text-red-500">Employee not found!</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UpdateEmployee;
