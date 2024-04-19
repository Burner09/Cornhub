import axios from "axios"
import { useEffect, useState } from "react"

export default function OrderProducts({ item }) {
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
        <div className="flex gap-8 p-4 h-20 overflow-auto">
          <img src={`http://localhost:3002/assets/${product.imagePaths[0]}`} alt={product.name} className="shadow-md" width={50} height={50}/>
          <div>
            <p className="text-xl font-medium">{product.name}</p>
            <p className="text-lg font-medium">x{item.selectedDetails.qty}</p>
          </div>
        </div>
      )}
    </div>
  )
}
