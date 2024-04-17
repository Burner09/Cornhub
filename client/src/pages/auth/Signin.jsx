import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import TextField from '@mui/material/TextField';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/staff/login', {email, password}, { withCredentials: true })
      .then((res) => {
        if (res.status = 200) {
          navigate('/staff')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <div className="w-[30%] my-24 mx-auto p-20 md:px-6 bg-slate-100 text-dark rounded-lg">
      <p className="text-3xl font-bold text-center mb-16">Staff Sign In</p>
      <div className="mx-auto max-w-[700px]">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <TextField onChange={((e) => setEmail(e.target.value))} id="email" label="Email" variant="standard" className="w-[400px]"/><br />
          <TextField onChange={((e) => setPassword(e.target.value))} id="password" label="Password" variant="standard" className="w-[400px]" /><br />
          <button type="submit" className="bg-tan rounded-md px-16 py-2 text-lg font-bold hover:bg-orange-500">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
