import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { TextField, Button } from '@mui/material';

export default function UserDetailFormModal({ onClose, setCart }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAdress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault()

    if(!firstname && !lastname && !address && !phonenumber && !email) {
      setError(true);
      return;
    }

    const userDetails = { firstname, lastname, address, phonenumber, email }

    axios.put('http://localhost:3002/cart/userdetails', userDetails, { withCredentials: true })
      .then((res) => {
        enqueueSnackbar("User details added successfully", { variant: "success" })
        setCart(res.data)
        onClose()
      }).catch((err) => {
        enqueueSnackbar(err.message, { variant: "error"})
        onClose()
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div 
        className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="max-w-full bg-white rounded-xl p-10 flex flex-col relative"
        >
          <p className="text-2xl text-center max-w-[500px]">Please Enter Your Details</p>

          <div className="flex flex-col gap-4 justify-center content-center mt-5">
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
              id="address"
              label="Adress"
              variant="standard"
              className="w-[400px] mb-4"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
            />
            <TextField
              id="phonenumber"
              label="Phone Number"
              variant="standard"
              className="w-[400px] mb-4"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              className="w-[400px] mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500">All fields are required</p>}
            <Button variant="contained" type="submit">Submit</Button>
          </div>
        </div>
      </div>
    </form>
  )
}
