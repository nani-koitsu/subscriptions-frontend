import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "../../Searchbar/SearchBar";
import "./Dashboard.css";
import SubscriptionBox from "../../SubscriptionBox/SubscriptionBox";

class Dashboard extends Component {
  state = {
    email: "",
    subs: []
  };
  componentDidMount() {
    if (!this.props.authUser.isAuthenticated) {
      this.props.history.push("/signin");
    }
    console.log(`Dashboard componentDidMount : `, this.props.authUser);
  }
  openSelectedSubscription = () => {};
  render() {
    return (
      <div className="dashboard-container">
        {this.props.authUser.isAuthenticated ? (
          <>{/* <ModalContainer hideModal={this.props.hideModal} /> */}</>
        ) : (
          <Redirect to="/signin" />
        )}
        <SearchBar />
        <SubscriptionBox />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};
export default connect(mapStateToProps, null)(withRouter(Dashboard));
