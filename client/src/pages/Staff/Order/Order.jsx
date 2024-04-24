import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import OrderItemStaff from '../../../components/Widgets/Orders/OrderItemStaff';
import OrderConfirmModal from '../../../components/Modals/OrderConfirmModal';

export default function Order() {
  const [order, setOrder] = useState();
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3002/order/${id}`, { withCredentials: true })
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err.message);
      });
  }, [id, enqueueSnackbar]);

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

  const handleOrder = (order) => {
    setOrder(order)
  }

  return (
    <div className='flex justify-center content-center p-20'>
      {order && 
        <div className="flex flex-col gap-4 bg-white p-8 rounded-lg">
          <div className="grid grid-cols-2">
            <p className="text-xl font-medium">Order <span className="text-green-500">{order?._id}</span> {order.isPriority? <span className="text-xs text-red-500">priority</span> : ""}</p>
            <div className='flex justify-end gap-8'>
              <button className='text-xl text-green-400 font-medium hover:text-dark' onClick={handleOrderComplete}><DoneAllIcon /></button>
              <button className='text-xl text-red-400 font-medium hover:text-dark' onClick={handleSetPriority}><PriorityHighIcon /></button>
            </div>
          </div>
          <p className="text-2xl font-medium">Customer Details</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <p className="text-sm"><AccountCircleIcon /> {order.userDetails.firstname} {order.userDetails?.lastname}</p>
            <p className="text-sm"><LocationOnIcon /> {order.userDetails.address}</p>
            <p className="text-sm"><PhoneIcon /> {order.userDetails.phonenumber}</p>
            <p className="text-sm"><EmailIcon /> {order.userDetails.email}</p>
          </div>

          <p className="text-2xl font-medium">Order Items {order.items.length}</p>
          <div className='max-h-[50vh] overflow-auto'>
            {order && order.items.map((item) => (
              <div key={item._id} className="w-[800px] mb-4">
                <OrderItemStaff item={item} />
              </div>
            ))}
          </div>
        </div>
      }
      {showModal && (
        <OrderConfirmModal message={message} order={order} action={action} handleOrder={handleOrder} onClose={() => setShowModal(!showModal)} />
      )}
    </div>
  );
}
