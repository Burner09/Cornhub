import React, { useState } from "react";
import { useSnackbar } from 'notistack';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function ChangePasswordModal({ staff, onClose}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState(null)
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);

  const handleMouseDownPassword = (e) => e.preventDefault();

  const passwordMatch = newPassword === confirmNewPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      setError("Passwords don't match")
      enqueueSnackbar('Password don\'t match', { variant: 'error' });
      return;
    }

    if(!oldPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required");
      enqueueSnackbar('All fields are required', { variant: 'error' });
      return
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      enqueueSnackbar('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.', { variant: 'error' });
      setError("Password does not meet requirements")
      return;
    }

    axios.put('http://localhost:3002/staff/changepassword', {email: staff.email, oldPassword, newPassword}, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate('/staff');
          enqueueSnackbar(`${staff.firstname} ${staff.lastname} Password Updated`, {variant: 'success'});
        }
      }).catch((err) => {
        setError(err.response.data)
        enqueueSnackbar(err.response.data, {variant: 'error'})
      })
  };

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
          <p className="text-2xl text-center max-w-[500px]">Change Password</p>
          <TextField
            id="oldPassword"
            label="Old Password"
            variant="standard"
            type={showOldPassword ? 'text' : 'password'}
            className="w-[400px] mb-4"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle old password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="newPassword"
            label="New Password"
            variant="standard"
            type={showNewPassword ? 'text' : 'password'}
            className="w-[400px] mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            id="confirmNewPassword"
            label="Confirm New Password"
            variant="standard"
            type={showConfirmNewPassword ? 'text' : 'password'}
            className={`w-[400px] mb-4 ${!passwordMatch && 'border-red-500'}`}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm new password visibility"
                    onClick={handleClickShowConfirmNewPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <ul className="text-sm text-gray-500">
            <li>Password must contain 1 uppercase and lowercase letter,<br /> 1 number, 1 special character </li>
            <li>Password must be at least 6 characters long</li>
          </ul>
          {error && <p className="text-red-500">{error}</p>}
          <Button variant="contained" type="submit">Change Password</Button>
        </div>
      </div>
    </form>
  )
}