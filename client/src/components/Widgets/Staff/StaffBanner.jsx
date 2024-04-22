import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StaffCard from './StaffCard';
import ConfirmDeleteModal from '../../Modals/ConfirmDeleteModal';

export default function StaffBanner({ staff }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    setStaffList(staff);
  }, [staff]);

  const deleteStaff = (staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const handleDelete = () => {
    const updatedStaffList = staffList.filter(employee => employee._id !== selectedStaff._id);
    setStaffList(updatedStaffList);
    setShowModal(false);
  };

  return (
    <div className="bg-white mt-8 p-8 rounded-lg">
      <div className="flex justify-between">
        <p className="text-2xl font-bold pb-2">Staff</p>
        <Link to='/staff/allstaff' className='text-lg font-medium hover:text-tan'>See All</Link>
      </div>
      <div className="flex rounded-lg gap-4 overflow-auto p-4">
        <Link to='/staff/createstaff' className='border rounded-lg'>
          <div className="flex justify-center align-center w-48 py-4 px-12">
            <p className='text-8xl'>+</p>
          </div>
          <p className="text-xl font-medium text-center">Add Staff</p>
        </Link>
        {staffList.map((employee) => (
          <div key={employee._id}>
            <StaffCard employee={employee} onDelete={() => deleteStaff(employee)} />
          </div>
        ))}
      </div>
      {showModal && selectedStaff && (
        <ConfirmDeleteModal name={`${selectedStaff.firstname} ${selectedStaff.lastname}`} link={`http://localhost:3002/staff/${selectedStaff._id}`} onClose={() => setShowModal(false)} onDelete={handleDelete}/>
      )}
    </div>
  )
}
