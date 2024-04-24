import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreateStaff() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (e) => {
    e.preventDefault();
  };

  const passwordMatch = password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      enqueueSnackbar('Passwords do not match', { variant: 'error' });
      return;
    }

    axios.post('http://localhost:3002/staff/createstaff', { firstname, lastname, email, password }, { withCredentials: true})
    .then(() => {
      enqueueSnackbar('Staff created successfully', { variant: 'success' });
      navigate('/staff');
    })
    .catch((error) => {
      enqueueSnackbar('Fail to create', { variant: 'error' });
      console.error('Error:', error);
    });
  };

  return (
    <form className="flex justify-center content-center p-20" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 bg-white p-8 rounded-lg">
        <p className="text-2xl font-medium text-center">Add New Staff</p>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            id="firstName"
            label="First Name"
            variant="standard"
            className="mb-4"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="standard"
            className="mb-4"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          className="w-[400px] mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          className="w-[400px] mb-4"
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
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          variant="standard"
          type={showConfirmPassword ? 'text' : 'password'}
          className={`w-[400px] mb-4 ${!passwordMatch && 'border-red-500'}`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        {!passwordMatch && <p className="text-red-500">Passwords do not match</p>}
        <Button variant="contained" type="submit">Submit</Button>
      </div>
    </form>
  );
}
