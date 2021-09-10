import React, { useEffect } from 'react';
import './App.css';
import NovaFaktura from './components/forma/NovaFaktura';
import Faktura from './models/faktura';
function App() {

  useEffect(()=>{
    
  },[])

  const dodajFakturuHandler = (faktura:Faktura) =>{
    console.log(faktura);
  }

  return (
    <div className="App">
      <header className="App-header">
       <NovaFaktura  />
      </header>
    </div>
  );
}

export default App;
