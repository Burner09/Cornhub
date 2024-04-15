import React from 'react'
import OrderItem from './OrderItem'

export default function OrderWidget({order}) {
  console.log(order)
  return (
    <div>
      <p className="text-xl text-green-400 col-span-1 inline">{order._id} <span className={`text-sm text-${order.isComplete? 'green': 'orange'}-500`}>• {order.isComplete? 'complete': 'pending'}</span></p>
      <div>
        {order && order.items.map((item) => (
          <OrderItem key={item.productID} item={item} />
        ))}
      </div>
    </div>
  )
}
