import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='flex justify-between items-center px-[70px] py-3 text-light bg-dark'>
      <div>
        <Link to='/' className='text-4xl font-bold'>Everything Branded</Link>
      </div>

      <div className='flex items-center gap-4'>
        <Link to='/products' className='nav-link'>Products</Link>
        <Link to='/contact' className='nav-link'>Contact</Link>
        <Link to='/cart' className='nav-link'>Cart</Link>
      </div>
    </nav>
  )
}
