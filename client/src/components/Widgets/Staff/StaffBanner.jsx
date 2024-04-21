import { Link } from "react-router-dom";
import StaffCard from './StaffCard';

export default function StaffBanner({staff}) {
  return (
    <div className="bg-white mt-8 p-8 rounded-lg">
      <div className="flex justify-between">
        <p className="text-2xl font-bold pb-2">Staff</p>
        <Link to='/staff/allstaff' className='text-lg font-mediumhover:text-tan'>See All</Link>
      </div>
      <div className="flex rounded-lg gap-4 overflow-auto p-4">
        <Link to='/staff/createproduct' className='border rounded-lg'>
          <div className="flex justify-center align-center w-48 py-4 px-12">
            <p className='text-8xl'>+</p>
          </div>
          <p className="text-xl font-medium text-center">Add Staff</p>
        </Link>
        {staff.map((employee) => (
          <div key={employee._id}>
            <StaffCard employee={employee} />
          </div>
        ))}
      </div>
    </div>
  )
}
