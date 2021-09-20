import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import FakturaProvider from './store/faktura-context';
import SifarnikProvider from './store/sifarnikContext';
import IzdavacProvider from './store/izdavac-context';

ReactDOM.render(
  <IzdavacProvider>
  <FakturaProvider>
    <SifarnikProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SifarnikProvider>
  </FakturaProvider>
  </IzdavacProvider>,
  document.getElementById('root')
);
