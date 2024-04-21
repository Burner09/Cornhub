import axios from "axios"
import { useState, useEffect } from "react"
import ProductWidget from "./ProductWidget"

export default function ProductsBanner({url, type}) {
  const [isLoading, setIsLoading] = useState(false)
  const [newItems, setNewItems] = useState([])
  

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${url}/items/${type}`)
      .then((res) => {
        setNewItems(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      });
  }, [url, type]);
  
  return (
    <div className="mt-20">
      <p className="text-2xl font-medium capitalize">{type} on everything branded</p><br />
      <div className="grid grid-cols-5">
        {isLoading ? <p className="text-4xl font-medium">Loading</p> : newItems.map((item) => (
          <div key={item._id} className="col-span-1">
            <ProductWidget item={item} url={url}/>
          </div>
        ))}
      </div>
      
    </div>
  )
}