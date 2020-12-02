import React from 'react';
import './css/App.css';
import GlobalStateProvider from './store/GlobalStateProvider';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

const App = () => {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
