import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';

export default function Contact() {
  return (
    <div className=" w-[60%] my-24 mx-auto p-20 md:px-6 bg-slate-100 text-dark rounded-lg">
      <div className="mb-12 grid gap-x-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="mx-auto mb-12 text-center lg:mb-0">
          <PublicIcon  />
          <h6 className="font-medium mt-4">Barbados</h6>
        </div>
        <div className="mx-auto mb-12 text-center lg:mb-0">
          <LocationOnIcon />
          <h6 className="font-medium mt-4">Goodland, St. Michael</h6>
        </div>
        <div className="mx-auto mb-6 text-center md:mb-0">
          <PhoneIcon />
          <h6 className="font-medium mt-4">1-246-546-2726</h6>
        </div>
        <div className="mx-auto text-center">
          <EmailIcon />
          <h6 className="font-medium mt-4">brandit246@gmail.com</h6>
        </div>
      </div>
      <div className="mx-auto max-w-[700px]">
        <form className="flex flex-col items-center">
          <TextField id="name" label="Name" variant="standard" className="w-[400px] "/><br />
          <TextField id="email" label="Email" variant="standard" className="w-[400px]"/><br />
          <TextField id="message" label="Message" variant="standard" multiline maxRows={4} className="w-[400px]"/><br />
          <button className="bg-tan rounded-md px-16 py-2 text-lg font-bold hover:bg-orange-500">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
