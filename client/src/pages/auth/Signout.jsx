import { useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Signout({isStaff}) {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3002/staff/logout')
      .then((res) => {
        const pastDate = new Date(0);
        document.cookie = "jwt=; expires=" + pastDate.toUTCString() + "; path=/";
        isStaff();
        navigate('/signin');
      }).catch(err => {
        console.log(err.message)
      })
  })
  return (
    <div>Signout</div>
  )
}
