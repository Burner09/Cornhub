import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function ProductCard({item}) {
  return (
    <div className='w-96 p-4 border rounded-lg'>
      <p className="text-green-500 text-lg mb-2">{item._id}</p>
      <div className="flex gap-8">
        <img src={`http://localhost:3002/assets/${item.imagePaths[0]}`} alt={item.name} className='shadow-sm col-span-1' height={125} width={125}/>
        <div className='w-[70%]'>
          <p className="capitalize">{item.name}</p>
          <p className="text-red-500">${item.price}</p>
          <div className="flex justify-between mt-8">
            <Link to='/' className='text-xl text-blue-400 font-medium hover:text-dark'><VisibilityIcon /></Link>
            <Link to='/' className='text-xl text-yellow-400 font-medium hover:text-dark'><EditIcon /></Link>
            <Link to='/' className='text-xl text-red-400 font-medium hover:text-dark'><DeleteIcon /></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
