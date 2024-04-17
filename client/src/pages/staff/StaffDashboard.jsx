
export default function StaffDashboard() {
  return (
    <div className="p-20">
      <p className="text-4xl font-bold">Staff Dashboard</p>
      <div className="grid grid-cols-3 gap-12 mt-8">
        <div className="col-span-1 bg-tan p-8 rounded-lg">
          Products
        </div>
        <div className="col-span-1 bg-tan p-8 rounded-lg">
          Orders 
        </div>
        <div className="col-span-1 bg-tan p-8 rounded-lg">
          Staff
        </div>

      </div>
      
    </div>
  )
}
