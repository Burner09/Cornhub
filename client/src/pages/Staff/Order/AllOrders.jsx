import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from 'notistack';
import OrderCard from "../../../components/Widgets/Orders/OrderCard";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

export default function AllOrders() {
  const [priorityOrders, setPriorityOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    axios.get('http://localhost:3002/order', { withCredentials: true })
      .then((res) => {
        axios.get('http://localhost:3002/order/priority', { withCredentials: true })
          .then((res) => {
            setPriorityOrders(res.data)
          })

        axios.get('http://localhost:3002/order/new', { withCredentials: true })
          .then((res) => {
            setNewOrders(res.data)
          })

        axios.get('http://localhost:3002/order/completed', { withCredentials: true })
          .then((res) => {
            setCompletedOrders(res.data)
          })
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate('/signin');
        }
        enqueueSnackbar('You do not have access to this page', { variant: 'error' });
      });
  }, [navigate, enqueueSnackbar]);

  const handleOrder = (order) => {
    if(order) {
      axios.get('http://localhost:3002/order/priority', { withCredentials: true })
        .then((res) => {
          setPriorityOrders(res.data)
        })

      axios.get('http://localhost:3002/order/new', { withCredentials: true })
        .then((res) => {
          setNewOrders(res.data)
        })

      axios.get('http://localhost:3002/order/completed', { withCredentials: true })
        .then((res) => {
          setCompletedOrders(res.data)
        })
    }
  }

  const filterOrdersByCustomerName = (orders) => {
    return orders.filter(order => {
      const fullName = `${order.userDetails.firstname} ${order.userDetails.lastname}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const filteredPriorityOrders = filterOrdersByCustomerName(priorityOrders);
  const filteredNewOrders = filterOrdersByCustomerName(newOrders);
  const filteredCompletedOrders = filterOrdersByCustomerName(completedOrders);

  return (
    <div className="p-20">
      <div className=" flex justify-center my-12">
        <TextField
          type="text"
          variant="standard"
          placeholder="Search By Customer Name"
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
      <div className="bg-white mt-8 p-8 rounded-lg">
        <p className="text-2xl font-bold pb-2">Priority Orders</p>
        <div className="flex rounded-lg gap-4 overflow-auto p-4">
          {filteredPriorityOrders && filteredPriorityOrders.map((order) => (
            <div key={order._id}>
              <OrderCard order={order} handleOrder={handleOrder}/>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white mt-8 p-8 rounded-lg">
        <p className="text-2xl font-bold pb-2">New Orders</p>
        <div className="flex rounded-lg gap-4 overflow-auto p-4">
          {filteredNewOrders && filteredNewOrders.map((order) => (
            <div key={order._id}>
              <OrderCard order={order} handleOrder={handleOrder}/>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white mt-8 p-8 rounded-lg">
        <p className="text-2xl font-bold pb-2">Completed Orders</p>
        <div className="flex rounded-lg gap-4 overflow-auto p-4">
          {filteredCompletedOrders && filteredCompletedOrders.map((order) => (
            <div key={order._id}>
              <OrderCard order={order} handleOrder={handleOrder}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
