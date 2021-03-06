import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { checkUserSession } from "./redux/user/user.actions";

import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

import "./default.scss";
import MainLayout from "./layouts/main-layout";
import HomePageLayout from "./layouts/homepage-layout";
import DashboardLayout from "./layouts/dashboard-layout";
import AdminLayout from "./layouts/admin-layout";

import Homepage from "./pages/homepage";
import Registration from "./pages/registration";
import Login from "./pages/login";
import Recovery from "./pages/recovery";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/admin";
import AdminToolbar from "./components/adminToolbar";
import Search from "./pages/search";
import ProductDetails from "./pages/productDetails";
import Cart from "./pages/cart";
import Payment from "./pages/payment";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div className="App">
      <AdminToolbar />
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
          exact
          path="/search"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/search/:filterType"
          render={() => (
            <MainLayout>
              <Search />
            </MainLayout>
          )}
        />
        <Route
          path="/product/:productID"
          render={() => (
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          )}
        />

        <Route
          path="/cart"
          render={() => (
            <MainLayout>
              <Cart />
            </MainLayout>
          )}
        />

        <Route
          path="/payment"
          render={() => (
            <WithAuth>
              <MainLayout>
              <Payment />
            </MainLayout>
            </WithAuth>
          )}
        />

        <Route
          path="/register"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
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
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )}
        />

        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
