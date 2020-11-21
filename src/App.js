import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./redux/user/user.actions";

import WithAuth from "./hoc/withAuth";

import "./default.scss";
import MainLayout from "./layouts/main-layout";
import HomePageLayout from "./layouts/homepage-layout";

import Homepage from "./pages/homepage";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Recovery from "./pages/recovery";
import Dashboard from "./pages/dashboard";

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
   dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomePageLayout>
              <Homepage />
            </HomePageLayout>
          )}
        />
        <Route
          path="/register"
          render={() => (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />

        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
