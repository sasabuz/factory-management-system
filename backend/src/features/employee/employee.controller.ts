import { Request, Response } from 'express';
import {
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
  updateEmployee
} from './employee.service';

// Get all employees
export async function getAllEmployeeController(req: Request, res: Response) {
  try {
    const searchTerm = req.query.search as string;
    const currentPage = Number(req.query.page) || 1;
    const response = await getAllEmployees(searchTerm, currentPage);
    res.status(200).json({
        success:true,
        message: "Fetched employees successfully.",
        data: response
    });
  } catch (error) {
    res.status(500).json({ success:false, message: 'Failed to fetch employees' });
  }
}

// Get single employee
export async function getSingleEmployeeController(req: Request, res: Response) {
  try {
    const employee = await getSingleEmployee(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({
        success:true,
        data: employee
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
}

// Update employee
export async function updateEmployeeController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updatedEmployee = await updateEmployee(id, payload);

    if (!updatedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully.",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update employee.",
    });
  }
}

// Delete employee
export async function deleteEmployeeController(req: Request, res: Response) {
  try {
    const deleted = await deleteEmployee(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ 
        success: true,
        message: 'Employee deleted successfully' 
    });

  } catch (error) {
    res.status(500).json({ success:false, message: 'Failed to delete employee' });
  }
}

