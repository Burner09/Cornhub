import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Staff/Order/Order';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Success from './pages/Success';
import Contact from './pages/Contact';
import Signin from './pages/auth/Signin';
import Signout from './pages/auth/Signout';
import StaffDashboard from './pages/Staff/StaffDashboard';
import ProductStaff from './pages/Staff/Product/ProductStaff'
import CreateProduct from './pages/Staff/Product/CreateProduct';
import Products from './pages/Products';
import UpdateProduct from './pages/Staff/Product/UpdateProduct';
import CreateStaff from './pages/Staff/CreateStaff';
import UpdateStaff from './pages/Staff/UpdateStaff';
import AllStaff from './pages/Staff/AllStaff';
import AllOrders from './pages/Staff/Order/AllOrders';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App bg-light text-dark">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/success' element={<Success />} />

        {/* Staff routes */}
        <Route path='/staff' element={<StaffDashboard />} />
        <Route path='/staff/allstaff' element={<AllStaff />} />
        <Route path='/staff/createstaff' element={<CreateStaff />} />
        <Route path='/staff/updatestaff/:id' element={<UpdateStaff />} />
        <Route path='/staff/products' element={<ProductStaff />} />
        <Route path='/staff/createproduct' element={<CreateProduct />} />
        <Route path='/staff/updateproduct/:id' element={<UpdateProduct />} />
        <Route path='/staff/orders' element={<AllOrders />} />
        <Route path='/staff/order/:id' element={<Order />} />
        
        {/* Auth routes */}
        <Route path='/signin' element={<Signin />} />
        <Route path='/signout' element={<Signout />} />

        {/* 404 Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;