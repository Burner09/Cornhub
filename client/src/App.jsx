import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Success from './pages/Success';

function App() {
  return (
    <div className="App bg-light text-dark">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path ='/orders' element={<Order />} />
        <Route path ='/success' element={<Success />} />s
      </Routes>
      <Footer />
    </div>
  );
}

export default App;