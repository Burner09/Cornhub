import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from './ProductCard';

export default function StaffProductBanner({items}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(items)
  }, [items])

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };
  return (
    <div className="bg-white mt-8 p-8 rounded-lg">
      <div className="flex justify-between">
        <p className="text-2xl font-bold pb-2">Products</p>
        <Link to='/staff/products' className='text-lg font-mediumhover:text-tan'>See All</Link>
      </div>
      <div className="flex rounded-lg gap-4 overflow-auto p-4">
        <Link to='/staff/createproduct' className='border rounded-lg'>
          <div className="flex justify-center align-center w-48 py-4 px-12">
            <p className='text-9xl'>+</p>
          </div>
          <p className="text-xl font-medium text-center">Add Product</p>
        </Link>
        {products.length !== 0 && products.map((item) => (
          <div key={item._id}>
            <ProductCard item={item} onDelete={handleDeleteProduct} />
          </div>
        ))}
      </div>
    </div>
  )
}
