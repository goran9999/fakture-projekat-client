import { Switch, Route, useHistory, Redirect, useLocation } from 'react-router-dom'
import FakturaDetaljiPage from './pages/FakturaDetaljiPage';
import HomePage from './pages/HomePage';
import NovaFakturaPage from './pages/NovaFakturaPage';
import NotFoundPage from './pages/NotFoundPage'
import SifarnikPage from './pages/SifarnikPage';
import DodajKupcaPage from './pages/DodajKupcaPage'
import './App.css'
import Sidebar from './UI/Sidebar/Sidebar';
import { useState } from 'react';
import RegistracijaForma from './components/forme/registracija/RegistracijaForma';
import PrijavaForma from './components/forme/prijava/PrijavaForma';

function App() {

  const { pathname: trenutnaPutanja } = useLocation()

  const [autorizovan, setAutorizovan] = useState(localStorage.getItem('token'));
  const history = useHistory();

  const uspesnaAutorizacijaHandler = () => {
    setAutorizovan(localStorage.getItem('token'));
    history.replace('/');
  }

  const logoutHandler = () => {
    setAutorizovan(null);
    localStorage.removeItem('token')
    history.replace('/prijava')
    window.location.reload();
  }

  return (
    <main style={{ display: 'flex' }}>
      {autorizovan &&
        <Sidebar>
          <ul>
            <li
              style={{ backgroundColor: trenutnaPutanja === '/' ? '#025955' : '' }}
              onClick={() => history.replace('/')}
            >Pregled
            </li>
            <li
              style={{ backgroundColor: trenutnaPutanja === '/dodaj-fakturu' ? '#025955' : '' }}
              onClick={() => history.push('/dodaj-fakturu')}
            >Dodaj novu fakturu
            </li>
            <li
              style={{ backgroundColor: trenutnaPutanja === '/sifarnik' ? '#025955' : '' }}
              onClick={() => history.push('/sifarnik')}
            >Sifarnik
            </li>
            <li>Statistika</li>
            <li>Podesavanja</li>
            <li><button type="submit" onClick={logoutHandler}>Odjava</button></li>
          </ul>
        </Sidebar>
      }
      <Switch>
        <Route path='/prijava' exact>
          {autorizovan ? <Redirect to='/' /> : <PrijavaForma onUspesnaPrijava={uspesnaAutorizacijaHandler} />}
        </Route>
        <Route path='/registracija' exact>
          {autorizovan ? <Redirect to='/' /> : <RegistracijaForma onUspesnaRegistracija={uspesnaAutorizacijaHandler} />}
        </Route>
        <Route path='/sifarnik/dodaj-kupca' exact>
          {autorizovan ? <DodajKupcaPage /> : <Redirect to='/registracija' />}
        </Route>
        <Route path='/sifarnik' exact>
          {autorizovan ? <SifarnikPage /> : <Redirect to='/registracija' />}
        </Route>
        <Route path='/dodaj-fakturu' exact>
          {autorizovan ? <NovaFakturaPage /> : <Redirect to='/registracija' />}
        </Route>
        <Route path='/fakture/:brojFakture' exact>
          {autorizovan ? <FakturaDetaljiPage /> : <Redirect to='/registracija' />}
        </Route>
        <Route path='/' exact>
          {localStorage.getItem('token') ? <HomePage /> : <Redirect to='/prijava' />}
        </Route>
        <Route path='*'>
          {autorizovan? <HomePage/> : <NotFoundPage /> }
        </Route>
      </Switch>
    </main>
  )
}

export default App;
