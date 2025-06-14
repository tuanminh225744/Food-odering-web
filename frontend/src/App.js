import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import Profile from './pages/profile/profile.jsx';
import Product from './pages/product/product.jsx';
import Cart from './pages/cart/cart.jsx';
import Admin from './pages/admin/admin.jsx';
import ForgotPassword from './pages/forgotPassword/forgotPassword.jsx';
import CheckEmail from './pages/checkEmail/checkEmail.jsx';
import ResetPassword from './pages/resetPassword/resetPassword.jsx';

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
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Redirect all other paths to home */}


        </Routes>
      </Router>
    </div>
  );
}

export default App;
