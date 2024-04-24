import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password && !email) {
      setError(true);
    }

    axios.post('http://localhost:3002/staff/login', {email, password}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate('/staff')
          enqueueSnackbar('Log In Successful', { variant: 'success' });
        }
      })
      .catch((err) => {
        enqueueSnackbar(err.response.data.login, { variant: 'error' });
        console.log(err.response.data.login)
      })
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <form className="flex justify-center content-center p-20" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 bg-white p-8 rounded-lg">
        <p className="text-2xl font-medium text-center">Staff Sign In</p>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          className="w-[350px] mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          className="w-[350px] mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {error && <p className="text-red-500">All fields are required</p>}
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    </form>
  );
}
