import { useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import OrderProducts from './OrderProducts';
import OrderConfirmModal from '../../Modals/OrderConfirmModal';
import CustomerDetailModal from '../../Modals/CustomerDetailModal';


export default function OrderCard({order, handleOrder}) {
  const [showModal, setShowModal] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false)
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");

  const handleOrderComplete = () => {
    order.isComplete? setMessage("Do you want to unmark this order as complete") : setMessage("Do you want to mark this order as complete");
    setAction("markComplete")
    setShowModal(!showModal)
  }
  
  const handleSetPriority = () => {
    order.isPriority? setMessage("Do you want to unmark this order as priority") : setMessage("Do you want to mark this order as priority");
    setAction("setPriority")
    setShowModal(!showModal)
  }

  

  return (
    <div className='w-96 p-4 border rounded-lg'>
      <p className="text-green-500 text-lg mb-2">{order._id} {order.isPriority? <span className='font-bold text-2xl text-red-500'>.</span>: ""}</p>
      <div className='h-28 overflow-auto'>
        {order.items.map((item) => (
          <OrderProducts key={item._id} item={item} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Link to={`/staff/order/${order._id}`} className='text-xl text-blue-400 font-medium hover:text-dark'><VisibilityIcon /></Link>
        <button className='text-xl text-yellow-400 font-medium hover:text-dark' onClick={() => setShowCustomerDetails(!showCustomerDetails)}><ContactPageIcon /></button>
        <button className='text-xl text-green-400 font-medium hover:text-dark' onClick={handleOrderComplete}><DoneAllIcon /></button>
        {!order.isComplete && <button className='text-xl text-red-400 font-medium hover:text-dark' onClick={handleSetPriority}><PriorityHighIcon /></button>}
      </div>
      {showModal && (
        <OrderConfirmModal message={message} order={order} action={action} onClose={() => setShowModal(!showModal)} handleOrder={handleOrder} />
      )}
      {showCustomerDetails && (
        <CustomerDetailModal userDetails={order.userDetails} onClose={() => setShowCustomerDetails(!showCustomerDetails)} />
      )}
    </div>
  )
}
