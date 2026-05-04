"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { Loader2Icon } from "lucide-react";
import { toast } from "../ui/toast";
import { useEmployeeStore } from "@/stores/employeeStore";

const DeleteEmployee = ({ empId }: { empId: string }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { deleteEmployeeById, isDeleting } = useEmployeeStore();

  const handleDelete = async () => {
    try {
      await deleteEmployeeById(empId);
      toast.success("Deleted Successfully", {
        position: "top-right",
        description: "Employee record has been deleted successfully.",
        variant: "success",
      });
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast.error("Failed to delete employee", {
        description: "Please try again later.",
      });
    } finally {
      setIsDeleteOpen(false);
    }
  };

  return (
    <div>
      <Button
        disabled={isDeleting}
        onClick={() => setIsDeleteOpen(true)}
        className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-white"
      >
        {isDeleting ? (
          <div className="flex items-center gap-2">
            <Loader2Icon className="animate-spin" size={18} />
            Deleting...
          </div>
        ) : (
          "Delete"
        )}
      </Button>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Employee"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-10 w-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Are you sure?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This action cannot be undone. The employee record will be
                permanently deleted.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => setIsDeleteOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteEmployee;
