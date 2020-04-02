import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SearchBar from "../../Searchbar/SearchBar";
import "./Dashboard.css";
import { getAllCloudinaryImages } from "../../../redux/action/cloudinaryAction";
import { getAllUserSubscriptions } from "../../../redux/action/subscriptionAction";
import TrackedSubscriptions from "../../Subscriptions/TrackedSubscriptions";

class Dashboard extends Component {
  state = {
    email: "",
    subscriptions: []
  };
  componentDidMount() {
    if (!this.props.authUser.isAuthenticated) {
      this.props.history.push("/signin");
    }

    this.props.getAllCloudinaryImages();
    this.props.getAllUserSubscriptions(this.props.authUser.user.id);
  }
  openSelectedSubscription = () => {};
  render() {
    // console.log(this.props.cloudinaryImages);
    let trackedSubscriptions = <TrackedSubscriptions />;
    // console.log(this.props.userSubscriptions);
    return (
      <div className="dashboard-container">
        {this.props.authUser.isAuthenticated ? (
          <>
            <SearchBar />
            {trackedSubscriptions}
          </>
        ) : (
          <Redirect to="/signin" />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    userSubscriptions: state.userSubscriptions,
    cloudinaryImages: state.cloudinaryImages
  };
};
export default connect(mapStateToProps, {
  getAllUserSubscriptions,
  getAllCloudinaryImages
})(withRouter(Dashboard));
