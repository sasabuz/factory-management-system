import { Request, Response } from "express"
import { addSalaryInformation, getSalaryInformations } from "./salary.service";


// added salary information
export const addSalaryController = async (req: Request, res: Response) => {
  try {
    const { empId, status, month } = req.body;
    // validation
    if (!empId || !status || !month) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // save or update salary info
    const data = await addSalaryInformation(empId, status, month);

    return res.status(200).json({ success: true, message: "Salary information saved", data });
  } catch (err: any) {
    console.error("Error in addSalaryController:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// get Salary informations
export const getSalaryController = async (req: Request, res: Response) => {
  try {
    const { month, search, page } = req.query;

    if (!month) {
      return res.status(400).json({ success: false, message: "Month is required" });
    }

    const data = await getSalaryInformations(
      month as string,
      (search as string) || "",
      parseInt((page as string) || "1")
    );

    return res.status(200).json({ success: true, data: data.data, total: data.total });
  } catch (err) {
    console.error("Error in getSalaryController:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};