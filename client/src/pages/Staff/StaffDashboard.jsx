import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import StaffProductBanner from '../../components/Widgets/Products/StaffProductBanner';
import OrderCard from '../../components/Widgets/Orders/OrderCard';


export default function StaffDashboard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3002/staff', { withCredentials: true })
    .then(() => {
      axios.get('http://localhost:3002/items/new')
      .then((res) => {
        setItems(res.data)
      })
      axios.get('http://localhost:3002/order/importantorders', { withCredentials: true })
      .then((res) => {
        setOrders(res.data)
        console.log(res.data)
      })
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate('/signin');
      }
      enqueueSnackbar('You do not have access to this page', { variant: 'error' });
    });
  }, [navigate, enqueueSnackbar])

  return (
    <div className="p-20">
      <p className="text-4xl font-bold">Staff Dashboard</p>

      <div className="bg-white mt-8 p-8 rounded-lg">
        <div className="flex justify-between">
          <p className="text-2xl font-bold pb-2">Orders</p>
          <Link to='/staff/products' className='text-lg font-mediumhover:text-tan'>See All</Link>
        </div>
        <div className="flex rounded-lg gap-4 overflow-auto p-4">
          {orders.map((order) => (
            <div key={order._id}>
              <OrderCard order={order} />
            </div>
          ))}
        </div>
      </div>

      <StaffProductBanner items={items} />
      
    </div>
  )
}
