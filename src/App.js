import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

const App = () => {
  return (
    <div className="app">

      <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
