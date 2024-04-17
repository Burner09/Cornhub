import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/staff/Order';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Success from './pages/Success';
import Contact from './pages/Contact';
import Signin from './pages/auth/Signin';
import Signout from './pages/auth/Signout';
import StaffDashboard from './pages/staff/StaffDashboard';

function App() {
  return (
    <div className="App bg-light text-dark">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/success' element={<Success />} />

        {/* Staff routes */}
        <Route path='/staff' element={<StaffDashboard />} />
        <Route path='/orders' element={<Order />} />
        
        {/* Auth routes */}
        <Route path='/signin' element={<Signin />} />
        <Route path='/signout' element={<Signout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;