import React, { Component } from "react";

import "./Toolbar.css";
// import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { logout } from "../../redux/action/authUserAction";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

class Toolbar extends Component {
  render() {
    let navigation = null;

    if (this.props.authUser.isAuthenticated) {
      console.log(this.props.authUser.user);
      navigation = (
        <div className="logout-container">
          <div className="user-email">{this.props.authUser.user.email}</div>
          <NavLink
            to="/logout"
            activeStyle={{
              fontWeight: "bold",
              color: "orange",
              textDecorationLine: "underline"
            }}
            className="logout"
            onClick={this.props.logout}
          >
            {/* <br /> */}
            Logout
          </NavLink>
        </div>
      );
    } else {
      navigation = (
        <div className="signin-signup">
          <NavLink
            to="/signup"
            className="signup"
            activeStyle={{
              fontWeight: "bold",
              textDecorationLine: "underline",
              color: "#79bac1"
            }}
          >
            Sign Up
          </NavLink>
          <br />
          <NavLink
            to="/signin"
            className="signin"
            activeStyle={{
              fontWeight: "bold",
              textDecorationLine: "underline",
              color: "#79bac1"
            }}
          >
            Sign In
          </NavLink>
        </div>
      );
    }
    return (
      <header className="toolbar">
        <nav className="toolbar-navigation">
          <div className="toolbar-logo">
            <a href="/">HACK SUBSCRIPTIONS</a>
          </div>
          <div className="spacer"></div>
          <div className="toolbar-navigation-items">{navigation}</div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, { logout })(withRouter(Toolbar));
