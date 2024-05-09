import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Contact() {
  return (
    <div className="p-20 flex justify-center items-center">
      <div className='grid grid-cols-2 bg-white p-10 rounded-lg'>
        <p className="text-4xl font-bold text-center col-span-2 mb-5">Contact Us</p>
        <div className="flex flex-col justify-center items-center text-xl gap-4">
          <p><EmailIcon /> brandit246@gmail.com</p>
          <p> <PhoneIcon />1-246-546-2726</p>
          <p><LocationOnIcon />Goodland main road, Bridgetown</p>
          <p className="text-3xl mt-4 font-bold">Socials</p>
          <div className="flex gap-20 justify-center">
            <a href="https://www.instagram.com/brandit246/?hl=en" rel="noopener noreferrer" target='_blank'><InstagramIcon sx={{fontSize: 40}} /></a>
            <a href="https://www.facebook.com/brandit246/" rel="noopener noreferrer" target='_blank'><FacebookIcon sx={{fontSize: 40}}/></a>
          </div>
        </div>
        <div className="mx-auto max-w-[500px] border-l pl-10">
          <form action='mailto:brandit246@gmail.com' className="flex flex-col items-center">
            <p className="text-2xl font-bold text-center">Message Us</p>
            <TextField id="name" label="Name" variant="standard" className="w-[400px] "/><br />
            <TextField id="email" label="Email" variant="standard" className="w-[400px]"/><br />
            <TextField id="message" label="Message" variant="standard" multiline maxRows={4} className="w-[400px]"/><br />
            <button type='submit' className="bg-tan rounded-md px-16 py-2 text-lg font-bold hover:bg-orange-500">
              Send
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}
