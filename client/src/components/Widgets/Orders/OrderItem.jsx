import axios from "axios"
import { useEffect, useState } from "react"

export default function OrderItem({ item }) {
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3002/items/product/${item.productID}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [item])

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
            <p className="text-xl font-medium">${product.price} <br />{item.selectedDetails.qty > 1 && <span className="text-sm">(${(item.selectedDetails.qty*product.price).toFixed(2)})</span>}</p>
          </div>
        </div>
      )}
    </div>
  )
}
