import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function StaffCard({employee}) {
  return (
    <div className='w-96 p-4 border rounded-lg'>
      <p className="text-green-500 text-lg mb-2">{employee._id}</p>
      <p className="capitalize">Name: {employee.firstname + ' ' + employee.lastname}</p>
      <p>Email: {employee.email}</p>
      <div className="flex justify-between mt-8">
        <Link to='/' className='text-xl text-blue-400 font-medium hover:text-dark'><VisibilityIcon /></Link>
        <Link to='/' className='text-xl text-yellow-400 font-medium hover:text-dark'><EditIcon /></Link>
        <Link to='/' className='text-xl text-red-400 font-medium hover:text-dark'><DeleteIcon /></Link>
      </div>

    </div>
  )
}
