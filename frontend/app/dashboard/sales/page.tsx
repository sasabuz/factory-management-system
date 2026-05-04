import SalesBody from "@/components/salesPage/SalesBody"

const page = () => {
  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-semibold">All Sales</h1>

      {/* Body */}
      <SalesBody></SalesBody>
    </div>
  )
}

export default page