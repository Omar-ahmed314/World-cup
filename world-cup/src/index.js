import React from 'react';
import ReactDOM from 'react-dom/client';
import BuyTicket from './components/TicketReservation/BuyTicket';
import './index.css';
import Home from './components/Home/Home';
import reportWebVitals from './reportWebVitals';
import Match from './components/Match/Match';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReservedMatches from './components/Reserved Matches/ReservedMatches';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/match/:id' element={<Match/>}/>
        <Route path='/buy_ticket/:id' element={<BuyTicket/>}/>
        <Route path='/reserved_matches' element={<ReservedMatches/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
