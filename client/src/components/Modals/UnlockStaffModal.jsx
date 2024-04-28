import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';

export default function UnlockStaffModal({staff, onClose}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null)
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password && !email) {
      setError("All Fields are Required");
      return
    }

    axios.put('http://localhost:3002/staff/unlock', {email, password, targetEmail: staff.email}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate('/staff')
          enqueueSnackbar(`${staff.firstname} ${staff.lastname} Unlocked`, {variant: 'success'})
        }
      })
      .catch((err) => {
        setError(err.response.data.login)
        enqueueSnackbar(err.response.data.login, {variant: 'error'})
      })
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <form onSubmit={handleSubmit}>
      <div 
        className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="max-w-full bg-white rounded-xl px-10 py-10 flex flex-col gap-4 relative"
        >
          <p className="text-2xl text-center max-w-[500px]">Enter An Unlocked Staff Account</p>
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
          {error && <p className="text-red-500">{error}</p>}
          <Button variant="contained" type="submit">Unlock</Button>
        </div>
      </div>
    </form>
  )
}
