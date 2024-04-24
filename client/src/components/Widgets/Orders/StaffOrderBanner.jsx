import { Link } from "react-router-dom";
import OrderCard from './OrderCard';

export default function StaffOrderBanner({orders, handleOrder}) {
  return (
    <div className="bg-white mt-8 p-8 rounded-lg">
      <div className="flex justify-between">
        <p className="text-2xl font-bold pb-2">Orders</p>
        <Link to='/staff/orders' className='text-lg font-mediumhover:text-tan'>See All</Link>
      </div>
      <div className="flex rounded-lg gap-4 overflow-auto p-4">
        {orders.map((order) => (
          <div key={order._id}>
            <OrderCard order={order} handleOrder={handleOrder} />
          </div>
        ))}
      </div>
    </div>
  )
}
