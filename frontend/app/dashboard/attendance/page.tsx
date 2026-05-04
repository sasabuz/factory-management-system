import AttendanceBody from "@/components/attendancePage/AttendanceBody"

const attendance = async() => {

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-5">Attendance</h1>
      
      {/* Body */}
      <AttendanceBody></AttendanceBody>
    </div>
  )
}

export default attendance