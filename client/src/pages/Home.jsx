import ProductsBanner from "../components/ProductsBanner";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const url = 'http://localhost:3002'

  useEffect(() => {
    axios.get('http://localhost:3002/cart/new', { withCredentials: true })
  }, []);

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 py-10">
        <img src='/images/HomeBanner.png' alt="Home Banner" className="shadow-lg"/><br />
        <p className="text-4xl font-bold text-center">Welcome to Everything Branded</p>
        <ProductsBanner url={url} type='new' />
        <ProductsBanner url={url} type='trending' />
      </div>
    </div>
  )
}
