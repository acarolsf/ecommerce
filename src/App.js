import React, { Component } from  'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

import './default.scss';
import MainLayout from './layouts/main-layout';
import HomePageLayout from './layouts/homepage-layout';

import Homepage from './pages/homepage';
import Registration from './pages/registration';
import Login from './pages/login';
import Recovery from './pages/recovery';

const initialState = {
  currentUser: null
}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomePageLayout currentUser={currentUser}>
              <Homepage />
            </HomePageLayout>
          )} />
          <Route path="/register" render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />
          <Route path="/login" 
              render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>
          )} />
          <Route path="/recovery" 
              render={() => (
            <MainLayout currentUser={currentUser}>
              <Recovery />
            </MainLayout>
          )} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
