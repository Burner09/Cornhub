import { useState, useEffect } from "react"
import axios from "axios"
import CartItem from "../components/Widgets/CartItem"
import OrderWidget from "../components/Widgets/Orders/OrderWidget";
import UserDetailFormModal from "../components/Modals/UserDetailFormModal";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3002/cart', { withCredentials: true })
      .then((res) => {
        setCart(res.data);
        setTotal(res.data.total)
        axios.get('http://localhost:3002/order/userorders', { withCredentials: true })
          .then((res) => {
            setOrders(res.data);
          })
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleItemRemove = (removedItemId, price, qty) => {
    const updatedUserCart = cart.userCart.filter(item => item._id !== removedItemId);

    const newTotal = total - price * qty;

    setCart(prevCart => ({
      ...prevCart,
      userCart: updatedUserCart
    }));
    setTotal(newTotal);
  };

  const handleUpdatedCart = (ucart) => {
    setCart(ucart);
  }

  const handleCheckout = () => {
    if(!cart.userDetails) {
      setShowModal(!showModal);
      return;
    }

    axios.get('http://localhost:3002/cart/checkout', { withCredentials: true })
      .then((res) => {
        window.location.href = `${res.data.url}`
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const cartItemCount = cart ? Object.keys((cart && cart.userCart) || {}).length : 0;
  const orderCount = orders ? orders.length : 0

  return (
    <div>
      {!isLoading && 
        <div className="grid grid-cols-5 gap-8 p-12">
          <div className="col-start-2 col-span-3 bg-white p-6">
            <div className="grid grid-cols-5 pb-2">
              <p className="col-span-1 text-3xl font-bold">Cart <span className="text-sm">({cartItemCount} items)</span></p>
              <p className="col-start-5 col-span-1 text-center text-xl font-medium">Price</p>
            </div>
            <hr />
            {cart && cart.userCart && cart.userCart.map(item => (
              <div key={item._id}>
                <CartItem item={item} onItemRemove={handleItemRemove} />
                <hr />
              </div>
            ))}
          </div>
          
          <div className="bg-white h-40 p-4 text-center">
            <p className="text-2xl font-medium">Subtotal</p>
            <p className="text-xl font-medium mb-3">{cartItemCount} items: ${(cart && total.toFixed(2)) || 0}</p>
            <button onClick={handleCheckout} className="bg-tan rounded-full px-8 py-2 text-md font-medium hover:bg-orange-500">
              Proceed To Checkout
            </button>
          </div>

          {orders && orders.length > 0 && <div className="col-start-2 col-span-3 bg-white p-6">
            <div className="grid grid-cols-5 pb-2">
              <p className="col-span-1 text-3xl font-bold">Orders <span className="text-sm">({orderCount} orders)</span></p>
              <p className="col-start-5 col-span-1 text-center text-xl font-medium">Price</p>
            </div>
            <hr />
            {orders && orders.map(order => (
              <div key={order._id}>
                <OrderWidget order={order} />
                <hr />
              </div>
            ))}
          </div>}
        </div>
      }
      {showModal && <UserDetailFormModal onClose={() => setShowModal(!showModal)} setCart={handleUpdatedCart} />}
    </div>
   
  )
}