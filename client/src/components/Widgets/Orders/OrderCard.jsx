import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import OrderProducts from './OrderProducts';


export default function OrderCard({order}) {
  
  return (
    <div className='w-96 p-4 border rounded-lg'>
      <p className="text-green-500 text-lg mb-2">{order._id}</p>
      <div className='h-28 overflow-auto'>
        {order.items.map((item) => (
          <OrderProducts key={item.productID} item={item} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Link to='/' className='text-xl text-blue-400 font-medium hover:text-dark'><VisibilityIcon /></Link>
        <Link to='/' className='text-xl text-yellow-400 font-medium hover:text-dark'><ContactPageIcon /></Link>
        <Link to='/' className='text-xl text-green-400 font-medium hover:text-dark'><DoneAllIcon /></Link>
        <Link to='/' className='text-xl text-red-400 font-medium hover:text-dark'><PriorityHighIcon /></Link>
      </div>
    </div>
  )
}
