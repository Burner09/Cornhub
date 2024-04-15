import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.post('http://localhost:3002/order', {}, { withCredentials: true })
      .then(() => {
        navigate('/cart');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div>Success</div>
  );
}
