import EmployeeBody from "@/components/employeePage/EmployeeBody"

const allEmployee = () => {
  return (
    <div>
       {/* Header */}
      <h1 className="text-2xl font-semibold">All Employee</h1>
      
      {/* Body */}
      <EmployeeBody></EmployeeBody>
    </div>
  )
}

export default allEmployee