import User from "../auth/auth.model";
import Salary from "./salary.model";
import { PipelineStage } from "mongoose";

interface SalaryInfoResult {
  data: any[];
  total: number;
}

// add salary information into daabase
export const addSalaryInformation = async (
  empId: string,
  status: string,
  month: string
) => {



  const newData = await Salary.findOneAndUpdate(
    { month, empId },
    { status },
    { upsert: true, new: true }
  );

  return newData;
};

// get salary information from database
export const getSalaryInformations = async (
  month: string,
  search: string = "",
  page: number = 1,
  limit: number = 10 // default per page
): Promise<SalaryInfoResult> => {
  const matchStage: Record<string, any> = { role: { $ne: "admin" } };
  if (search) {
    matchStage.name = { $regex: search, $options: "i" }; 
  }

  const pipeline: PipelineStage[] = [
    { $match: matchStage },
    {
      $lookup: {
        from: "salaries",
        localField: "_id",
        foreignField: "empId",
        as: "salaryData",
      },
    },
    {
      $addFields: {
        salaryInMonth: {
          $filter: {
            input: "$salaryData",
            as: "s",
            cond: { $eq: ["$$s.month", month] },
          },
        },
      },
    },
    {
      $project: {
        _id:0,
        name: 1,
        empId: "$_id",
        email: 1,
        salary: 1,
        month: month,
        status: {
          $ifNull: [
            { $arrayElemAt: ["$salaryInMonth.status", 0] },
            "unpaid",
          ],
        },
      },
    },
    { $sort: { name: 1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
  ];

  const data = await User.aggregate(pipeline);
  const total = await User.countDocuments(matchStage);

  return { data, total };
};
