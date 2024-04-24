import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import StaffProductBanner from '../../components/Widgets/Products/StaffProductBanner';
import StaffOrderBanner from '../../components/Widgets/Orders/StaffOrderBanner';
import StaffBanner from '../../components/Widgets/Staff/StaffBanner';



export default function StaffDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar();
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [staff, setStaff] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:3002/staff', { withCredentials: true })
    .then(() => {
      axios.get('http://localhost:3002/items/new')
      .then((res) => {
        setItems(res.data)
      })
      axios.get('http://localhost:3002/order/importantorders', { withCredentials: true })
      .then((res) => {
        setOrders(res.data)
      })
      axios.get('http://localhost:3002/staff/allstaff')
      .then((res) => {
        setStaff(res.data)
      })
      setIsLoading(false)
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        navigate('/signin');
      }
      enqueueSnackbar('You do not have access to this page', { variant: 'error' });
      setIsLoading(false)
    });
  }, [navigate, enqueueSnackbar])

  const handleOrder = (order) => {
    if(order) {
      axios.get('http://localhost:3002/order/importantorders', { withCredentials: true })
      .then((res) => {
        setOrders(res.data)
      }).catch((err) => console.log(err))
    }
  }

  return (
    <div className="p-20">
      <p className="text-4xl font-bold">Staff Dashboard</p>
      {!isLoading && items.length > 0 && 
        <div>
          <StaffOrderBanner orders={orders} handleOrder={handleOrder} />
          <StaffProductBanner items={items} />
          <StaffBanner staff={staff} />
        </div>
      }
    </div>
  )
}
