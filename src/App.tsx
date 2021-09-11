import React from 'react';
import { Switch, Route } from 'react-router-dom'
import FakturaDetaljiPage from './pages/FakturaDetaljiPage';
import HomePage from './pages/HomePage';
import NovaFakturaPage from './pages/NovaFakturaPage';

function App() {
  return (
    <>
      <Switch>
        <Route path='/dodaj-fakturu'><NovaFakturaPage /></Route>
        <Route path='/fakture/:brojFakture'><FakturaDetaljiPage /></Route>
        <Route path='/'><HomePage /></Route>
      </Switch>
    </>
  );
}

export default App;
