import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import FakturaProvider from './store/faktura-context';

ReactDOM.render(
  <FakturaProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FakturaProvider>,
  document.getElementById('root')
);
