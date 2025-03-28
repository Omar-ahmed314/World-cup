import React from 'react';
import ReactDOM from 'react-dom/client';
import BuyTicket from './components/TicketReservation/BuyTicket';
import './index.css';
import Home from './components/Home/Home';
import reportWebVitals from './reportWebVitals';
import Match from './components/Match/Match';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReservedMatches from './components/Reserved Matches/ReservedMatches';
import Sign from './components/Sign';
import Register from './components/Register';
import { AuthProvider } from './Hooks/AuthProvider';
import AutoReload from './components/AutoReload';
import Dashboard from './components/Admin/Dashboard';
import Profile from './Profile/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<AutoReload />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/match/:id" element={<Match />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reserved_matches" element={<ReservedMatches />} />
          <Route path="/login" element={<Sign />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
