import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ToolBar from "./components/Toolbar/Toolbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const Signin =
  React.lazy(() => import("./components/SignIn/SignIn"));

const Signup =
  React.lazy(() => import("./components/SignUp/SignUp"));

const Landing =
  React.lazy(() => import("./components/containers/Landing/Landing"));

const Dashboard =
  React.lazy(() => import("./components/containers/Dashboard/Dashboard"));

const GoogleAuth = React.lazy(() => import('./components/GoogleAuth/GoogleAuth'))
class AppRouter extends Component {
  render() {
    return (
      <>
        <ToolBar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/google" component={GoogleAuth} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </>
    );
  }
}
export default AppRouter;
