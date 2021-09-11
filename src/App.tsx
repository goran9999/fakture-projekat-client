import React from 'react';
import { Switch, Route } from 'react-router-dom'
import FakturaDetaljiPage from './pages/FakturaDetaljiPage';
import HomePage from './pages/HomePage';
import NovaFakturaPage from './pages/NovaFakturaPage';
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <>
      <Switch>
        <Route path='/dodaj-fakturu'><NovaFakturaPage /></Route>
        <Route path='/fakture/:brojFakture'><FakturaDetaljiPage /></Route>
        <Route path='/' exact><HomePage /></Route>
        <Route path='*'><NotFoundPage /></Route>
      </Switch>
    </>
  );
}

export default App;
