import ProductsBanner from "../components/Widgets/Products//ProductsBanner";
import axios from "axios";
import { useEffect } from "react";

export default function Home({isStaff}) {
  const url = 'http://localhost:3002'

  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  useEffect(() => {
    const jwtCookie = getCookie('jwt');
  
    if (jwtCookie) {
      isStaff(true);
    } else {isStaff(false)}
  }, [isStaff]);

  useEffect(() => {
    axios.get('http://localhost:3002/cart/new', { withCredentials: true })
  }, []);

  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 py-10">
        <img src='/images/HomeBanner.png' alt="Home Banner" className="shadow-lg"/><br />
        <p className="text-5xl font-bold text-center">Welcome to Everything Branded</p>
        <ProductsBanner url={url} type='new' />
        <ProductsBanner url={url} type='popular' />
      </div>
    </div>
  )
}
