import { Link } from 'react-router-dom';
import MapIcon from '@mui/icons-material/Map';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <div className="grid grid-cols-8 bg-dark text-light mt-5 py-12">
      <div className="col-start-2 col-span-2 text-center">
        <p className='text-2xl font-medium'>Contact</p>
        <ul className="list-none py-10">
          <li><a href='mailto:brandit246@gmail.com'>brandit246@gmail.com</a></li>
          <li><a href="tel:1246546-2726">1-246-546-2726</a></li><br />
          <li><a href="https://www.google.com/maps/place/Everything+Branded/@13.115261,-59.6218943,15z/data=!4m6!3m5!1s0x8c43f7125b486ccd:0x19acc35eefbf0fce!8m2!3d13.115261!4d-59.6218943!16s%2Fg%2F11f5hkbfcr?entry=ttu" rel="noopener noreferrer" target='_blank'>Goodland main road, Bridgetown,<br /> Saint Michael Barbados</a></li>
        </ul>
      </div>
      <div className="col-span-2 text-center">
        <p className="text-4xl font-medium">Everything Branded</p>
        <div className='flex justify-center gap-10 my-12'>
          <a href="https://www.instagram.com/brandit246/?hl=en" rel="noopener noreferrer" target='_blank'><InstagramIcon sx={{fontSize: 35}} /></a>
          <a href="https://www.facebook.com/brandit246/" rel="noopener noreferrer" target='_blank'><FacebookIcon sx={{fontSize: 35}}/></a>
          <a href="https://www.google.com/maps/place/Everything+Branded/@13.115261,-59.6218943,15z/data=!4m6!3m5!1s0x8c43f7125b486ccd:0x19acc35eefbf0fce!8m2!3d13.115261!4d-59.6218943!16s%2Fg%2F11f5hkbfcr?entry=ttu" rel="noopener noreferrer" target='_blank'><MapIcon sx={{fontSize: 35}} /></a>
        </div>
        <p className='text-md'>You Think It, We Print It</p>
      </div>

      <div className="col-span-2 text-center">
        <p className="text-2xl font-medium">Useful Links</p>
        <div className="flex flex-col justify-center gap-2 py-10">
          <Link to='/' className='text-xl font-medium hover:text-tan'>Contact</Link>
          <Link to='/' className='text-xl font-medium hover:text-tan'>Products</Link>
          <Link to='/' className='text-xl font-medium hover:text-tan'>About US</Link>
        </div>
      </div>
    </div>
  )
}
