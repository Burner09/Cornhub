import { Link } from 'react-router-dom';

export default function Navbar({isStaff}) {
  return (
    <nav className='flex justify-between items-center px-[70px] py-5 text-light bg-dark'>
      <div>
        <Link to='/' className='text-4xl font-bold'>Everything Branded</Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link to='/products' className='nav-link'>Products</Link>
        <Link to='/about' className='nav-link'>About</Link>
        <Link to='/contact' className='nav-link'>Contact</Link>
        <Link to='/cart' className='nav-link'>Cart</Link>
        {isStaff && <Link to='/staff' className='nav-link'>Staff</Link>}
        {isStaff && <Link to='/signout' className='nav-link'>Logout</Link>}
      </div>
    </nav>
  );
}
