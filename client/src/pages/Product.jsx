import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import OrderForm from "../components/OrderForm"

export default function Product() {
  const [product, setProduct] = useState({})
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const url = 'http://localhost:3002'

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${url}/items/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [id])

  return (
    <div>
      {isLoading ? (
        <p className="text-4xl font-medium">Loading</p>
      ) : product.imagePaths && product.imagePaths.length > 0 &&
        <div className="grid grid-cols-5">
          <div className="col-span-1 flex flex-col pt-12 justify-start items-end">
            {product.imagePaths.map((image) => (
              <div key={image} className='rounded-lg bg-white h-24 w-24 mb-2 relative flex justify-center items-center'>
                <img src={`${url}/assets/${image}`} alt={`${product.name}`} className="object-cover max-w-full max-h-full cursor-pointer" onClick={() => setSelectedImage(image)} />
              </div>
            ))}
          </div>
          <div className="col-span-3 col-start-2 grid grid-cols-5 pt-12">
            <div className="col-span-3">
              <img src={`${url}/assets/${selectedImage || product.imagePaths[0]}`} alt={`${product.name + selectedImage}`} className="ml-8 rounded-lg bg-white" width={550} height={550}/>
            </div>

            <div className="col-span-2 p-12">
              <p className="text-3xl capitalize">{ product.name }</p><br />
              <p className="text-2xl font-medium text-red-600">
                {typeof product.price === 'number' ? `$${product.price.toFixed(2)} BDS` : 'Price not available'}
              </p>
              <p className="text-sm indent-3">per print</p> <br />
              
              <OrderForm product={product} />
            </div>
          </div>
          <div className="col-start-2 col-span-3 mt-8">
            <p className="text-xl">Description</p>
            <p className="indent-6">{product.description}</p><br />
          </div>
        </div>
      }
    </div>
  )
}
