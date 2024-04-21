import React from 'react'
import OrderItem from './OrderItem'

export default function OrderWidget({order}) {
  return (
    <div>
      <p className="text-xl font-medium col-span-1">{order._id} <span className={`text-sm ${order.isComplete? 'text-green-400' : 'text-tan'}`}>• {order.isComplete? 'complete': 'pending'}</span></p>
      <div>
        {order && order.items.map((item) => (
          <OrderItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  )
}
