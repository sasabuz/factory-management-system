import User from "../auth/auth.model";
import Attendance from "./attendance.model"
import { PipelineStage } from "mongoose";

interface AttendanceInfoResult {
  data: any[];
  total: number;
}

// get attendences based on date
export const getAttendance = async (
  date: string,
  search: string = "",
  page: number = 1,
  limit: number = 10
): Promise<AttendanceInfoResult> => {
  const matchStage: Record<string, any> = { role: { $ne: "admin" } };
  if (search) {
    matchStage.name = { $regex: search, $options: "i" };
  }

  const pipeline: PipelineStage[] = [
    { $match: matchStage },
    {
      $lookup: {
        from: "attendances", // attendance collection name
        localField: "_id",
        foreignField: "empId",
        as: "attendanceData",
      },
    },
    {
      $addFields: {
        attendanceOnDate: {
          $filter: {
            input: "$attendanceData",
            as: "a",
            cond: { $eq: ["$$a.date", date] },
          },
        },
      },
    },
    {
      $project: {
        name: 1,
        empId: "$_id",
        email: 1,
        role:1,
        status: {
          $ifNull: [
            { $arrayElemAt: ["$attendanceOnDate.status", 0] },
            "absent", // default if no attendance
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

// Update attendance
export const updateAttendance = async(empId:string, status:'present'| 'absent'|'leave', date:string)=>{
    const response = await Attendance.findOneAndUpdate({empId, date}, {status}, {new:true, upsert:true});
    return response;
}