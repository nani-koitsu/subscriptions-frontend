import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AppRouter from "./AppRouter";
import Spinner from "./components/Spinner/Spinner";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import checkTokenAuth from "./lib/helpers/checkTokenAuth";

checkTokenAuth(store);

const App = () => (
  <>
    <Provider store={store}>
      <Router>
        <React.Suspense fallback={<Spinner />}>
          <Layout>
            <AppRouter />
          </Layout>
        </React.Suspense>
      </Router>
    </Provider>
  </>
);

export default App;
