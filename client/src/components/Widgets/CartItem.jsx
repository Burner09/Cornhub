import axios from "axios"
import { useEffect, useState } from "react"
import { useSnackbar } from 'notistack';

export default function CartItem({ item, onItemRemove }) {
  const [product, setProduct] = useState(null)
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    axios.get(`http://localhost:3002/items/product/${item.productID}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [item])

  const handleRemoveItem = () => {
    axios.delete(`http://localhost:3002/cart/${item._id}`, { withCredentials: true })
      .then(() => {
        onItemRemove(item._id, product.price, item.selectedDetails.qty);
        enqueueSnackbar('Product Removed Cart', { variant: 'success' });
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div>
      {product && product.imagePaths && product.imagePaths.length > 0 && ( 
        <div className="grid grid-cols-5 gap-8 p-4">
          <img src={`http://localhost:3002/assets/${product.imagePaths[0]}`} alt={product.name} className="col-span-1 shadow-md"/>
          <div className="col-span-3">
            <p className="text-xl font-medium">{product.name}</p>
            <p className="text-md">{product.description}</p>
            <p className="text-lg font-medium">qty({item.selectedDetails.qty})</p>
          </div>
          <div className="col-span-1 flex flex-col justify-between text-center pb-4">
            <p className="text-xl font-medium">${product.price.toFixed(2)} <br />{item.selectedDetails.qty > 1 && <span className="text-sm">(${(item.selectedDetails.qty*product.price).toFixed(2)})</span>}</p>
            <button className="text-red-500" onClick={handleRemoveItem}>Remove Item</button>
          </div>
        </div>
      )}
    </div>
  )
}
