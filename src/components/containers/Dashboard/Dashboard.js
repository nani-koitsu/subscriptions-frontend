import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "../../Searchbar/SearchBar";
import "./Dashboard.css";
// import SubscriptionBox from "../../SubscriptionBox/SubscriptionBox";
import { getAllUserSubscriptions } from "../../../redux/action/subscriptionAction";

class Dashboard extends Component {
  state = {
    email: "",
    subscriptions: []
  };
  componentDidMount() {
    if (!this.props.authUser.isAuthenticated) {
      this.props.history.push("/signin");
    }
    this.props.getAllUserSubscriptions(this.props.authUser.user.id);
    // this.props.getAllUserSubscriptions();
    console.log(`Dashboard componentDidMount : `, this.props.authUser.user.id);
  }
  openSelectedSubscription = () => {};
  render() {
    // console.log(this.props.userSubscriptions);
    return (
      <div className="dashboard-container">
        {this.props.authUser.isAuthenticated ? (
          <>{console.log("after auth", this.props.userSubscriptions)}</>
        ) : (
          <Redirect to="/signin" />
        )}
        <SearchBar />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    userSubscriptions: state.userSubscriptions
  };
};
export default connect(mapStateToProps, { getAllUserSubscriptions })(
  withRouter(Dashboard)
);
