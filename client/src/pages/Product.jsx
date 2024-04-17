import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import OrderForm from "../components/OrderForm"

export default function Product() {
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const url = 'http://localhost:3002'
  const qty = [1, 2, 5, 10, 20, 50]
  const colors = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
  const sizes = ["sm", "md", "lg", "xl"]

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${url}/items/product/${id}`)
      .then((res) => {
        const productWithDetails = {
          ...res.data,
          specificDetails: {
            qty: qty,
            colors: colors,
            sizes: sizes,
            random: sizes,
            else: sizes,

          }
        };
        setProduct(productWithDetails);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [id])

  return (
    <div className="grid grid-cols-5">
      {isLoading ? (
        <p className="text-4xl font-medium">Loading</p>
      ) : (
        <div className="col-span-3 col-start-2 grid grid-cols-5 py-12">
          <div className="col-span-3">
            {product.imagePaths && product.imagePaths.length > 0 ? (
              <img src={`${url}/assets/${product.imagePaths[0]}`} alt={`${product.name}`} className="mx-auto bg-white" width={550} height={550}/>
            ) : (
              <p>No image available</p>
            )}
          </div>

          <div className="col-span-2 p-12">
            <p className="text-3xl capitalize">{ product.name }</p><br />
            <p className="text-2xl font-medium text-red-600">${product.price} BDS</p>
            <p className="text-sm indent-3">per print</p> <br />
            
            <OrderForm product={product} />
          </div>
        </div>
      )}
        <div className="col-start-2 col-span-3">
          <p className="text-xl">Description</p>
          <p className="indent-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ab minus eaque harum, repellat suscipit repellendus dolorem placeat tenetur explicabo rem, enim delectus qui doloribus iste assumenda mollitia aliquid officia.</p><br />
        </div>
    </div>
  )
}
