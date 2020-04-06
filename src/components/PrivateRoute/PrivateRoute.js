import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authUser.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  authUser: PropTypes.object.isRequired,
  cloudinaryImages: PropTypes.object.isRequired,
  userSubscriptions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  cloudinaryImages: state.cloudinaryImages,
  userSubscriptions: state.userSubscriptions,
});

export default connect(mapStateToProps)(PrivateRoute);
