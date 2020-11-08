import React from  'react';

import Header from './components/header';
import Homepage from './pages/homepage';

import './default.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
