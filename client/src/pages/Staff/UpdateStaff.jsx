import React, { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function CreateStaff() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3002/staff/${id}`)
      .then((res) => {
        setFirstname(res.data.firstname)
        setLastname(res.data.lastname)
        setEmail(res.data.email)
      }).catch((err) => {
        console.log(err)
      })
  }, [id])

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!firstname || !lastname || !email || !password) {
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return;
    }

    axios.put(`http://localhost:3002/staff/${id}`, { firstname, lastname, email, password }, { withCredentials: true})
    .then(() => {
      enqueueSnackbar('Updated successfully', { variant: 'success' });
      navigate('/staff');
    })
    .catch((error) => {
      enqueueSnackbar('Fail to update', { variant: 'error' });
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
            error={submitAttempted && !firstname}
            helperText={submitAttempted && !firstname ? "First Name is required" : ""}
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="standard"
            className="mb-4"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            error={submitAttempted && !lastname}
            helperText={submitAttempted && !lastname ? "Last Name is required" : ""}
          />
        </div>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          className="w-[400px] mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={submitAttempted && !email}
          helperText={submitAttempted && !email ? "Email is required" : ""}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type={showPassword ? 'text' : 'password'}
          className="w-[400px] mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={submitAttempted && !password}
          helperText={submitAttempted && !password ? "Password is required" : ""}
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
        <Button variant="contained" type="submit">Update</Button>
      </div>
    </form>
  );
}
