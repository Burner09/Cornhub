import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';

export default function StaffCard({ employee, onDelete }) { 
  return (
    <div className='w-96 p-4 border rounded-lg bg-white'>
      <div className="flex justify-between">
        <p className="text-green-500 text-lg mb-2">{employee._id}</p>
        {employee.isLocked && <p className="text-xl text-blue-400" title="Account Locked"><LockIcon /></p>}
      </div>
      <p className="capitalize">Name: {employee.firstname + ' ' + employee.lastname}</p>
      <p>Email: {employee.email}</p>
      <div className="flex justify-end gap-8 mt-8">
        <Link to={`/staff/updatestaff/${employee._id}`} className='text-xl text-yellow-400 font-medium hover:text-dark' title="Edit Account"><EditIcon /></Link>
        <button className='text-xl text-red-400 font-medium hover:text-dark' title="Delete Account" onClick={onDelete}><DeleteIcon /></button>
      </div>
    </div>
  )
}
