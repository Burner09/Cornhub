import { useState, useEffect } from "react"
import axios from "axios"
import CartItem from "../components/Widgets/CartItem"

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState(null);
  
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3002/cart', { withCredentials: true })
      .then((res) => {
        setCart(res.data);
        setTotal(res.data.cart.total)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleItemRemove = (removedItemId, price, qty ) => {
    setCart(prevCart => ({
      ...prevCart,
      cart: {
        ...prevCart.cart,
        userCart: prevCart.cart.userCart.filter(item => item._id !== removedItemId)
      }
    }));

    setTotal(total - price * qty)
  };

  const handleCheckout = () => {
    axios.get('http://localhost:3002/cart/checkout', { withCredentials: true })
  }

  const cartItemCount = cart ? Object.keys((cart.cart && cart.cart.userCart) || {}).length : 0;

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
            {cart && cart.cart && cart.cart.userCart && cart.cart.userCart.map(item => (
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
        </div>
      }
    </div>
   
  )
}