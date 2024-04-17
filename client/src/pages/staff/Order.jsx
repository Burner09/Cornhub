import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';

export default function Order() {
  const [orders, setOrders] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    axios.get('http://localhost:3002/order', { withCredentials: true })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate('/signin');
        }
        enqueueSnackbar('You do not have access to this page', { variant: 'error' });
      });
  }, [navigate, enqueueSnackbar]);

  return (
    <div>Order</div>
  );
}
