import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../../../components/Widgets/Products/ProductCard';

export default function ProductStaff() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:3002/items')
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-20">
      <p className="text-4xl font-medium">All Products</p>
      <div className=" flex justify-center my-12">
        <TextField
          type="text"
          variant="standard"
          placeholder="Search A Product Name"
          value={searchQuery}
          className="w-[400px]"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {isLoading ? <p className="text-4xl font-medium">Loading</p> : 
          filteredProducts.map((item) => (
            <div key={item._id}>
              <ProductCard item={item} onDelete={handleDeleteProduct} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
