import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function CustomerDetailModal({ userDetails, onClose }) {
  return (
    <div 
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-w-full bg-white rounded-xl px-20 py-10 flex flex-col gap-4 relative"
      >
        <p className="text-2xl font-medium text-center max-w-[500px]">Customer Details</p>
        <p className="text-xl"><AccountCircleIcon /> {userDetails.firstname} {userDetails.lastname}</p>
        <p className="text-xl"><LocationOnIcon /> {userDetails.address}</p>
        <p className="text-xl"><PhoneIcon /> {userDetails.phonenumber}</p>
        <p className="text-xl"><EmailIcon /> {userDetails.email}</p>

      </div>
    </div>
  )
}
