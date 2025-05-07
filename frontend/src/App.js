import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<h1>login Page</h1>} />
          <Route path="/register" element={<h1>register Page</h1>} />
          <Route path="/profile" element={<h1>profile Page</h1>} />
          <Route path="/product" element={<h1>Product Page</h1>} />
          <Route path="/cart" element={<h1>Cart Page</h1>} />
          <Route path="/admin" element={<h1>Admin Page</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
