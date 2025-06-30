import './App.css';
import './assets/css/base.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Profile from './pages/profile/profile.jsx';
import Product from './pages/product/product.jsx';
import Cart from './pages/cart/cart.jsx';
import Admin from './pages/admin/admin.jsx';
import UserOrders from './pages/order/userOrders.jsx';
import ChangePassword from './pages/changePassword/changePassword.jsx';
import Pay from './pages/pay/pay.jsx';
import Search from './pages/search/search';

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/orders" element={<UserOrders />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
