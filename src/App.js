import React from  'react';
import { Switch, Route } from 'react-router-dom';

import './default.scss';
import MainLayout from './layouts/main-layout';
import HomePageLayout from './layouts/homepage-layout';

import Homepage from './pages/homepage';
import Registration from './pages/registration';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <HomePageLayout>
            <Homepage />
          </HomePageLayout>
        )} />
        <Route path="/register" render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
      </Switch>
    </div>
  );
}

export default App;
