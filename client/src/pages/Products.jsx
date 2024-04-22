import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import ProductWidget from '../components/Widgets/Products/ProductWidget';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const url = 'http://localhost:3002';

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
      <div className="grid grid-cols-5 gap-4">
        {isLoading ? <p className="text-4xl font-medium">Loading</p> : 
          filteredProducts.map((item) => (
            <div key={item._id} className="col-span-1 mb-12">
              <ProductWidget item={item} url={url} />
            </div>
          ))
        }
      </div>
    </div>
  );
}
