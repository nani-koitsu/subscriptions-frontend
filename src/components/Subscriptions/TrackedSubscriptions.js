import React from "react";
import { connect } from "react-redux";
import UserSubscription from "./UserSubscriptions/UserSubscription";
import { getAllUserSubscriptions } from "../../redux/action/subscriptionAction";

class TrackedSubscriptions extends React.Component {
  render() {
    // console.log(this.props);
    const { userSubscriptions } = this.props.userSubscriptions;
    let allUserSubscriptions = (
      <div className="subscription-container">
        {userSubscriptions.map((userSub) => {
          return <UserSubscription key={userSub._id} {...userSub} />;
        })}
      </div>
    );
    return <>{allUserSubscriptions}</>;
  }
}

const mapStateToProps = (state) => {
  return {
    userSubscriptions: state.userSubscriptions,
    authUser: state.authUser,
    cloudinaryImages: state.cloudinaryImages,
  };
};

export default connect(mapStateToProps, { getAllUserSubscriptions })(
  TrackedSubscriptions
);

// container
