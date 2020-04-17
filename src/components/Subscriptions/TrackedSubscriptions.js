import React from "react";
import { connect } from "react-redux";
import Subscription from "./UserSubscriptions/Subscription";
import { getAllUserSubscriptions } from "../../redux/action/subscriptionAction";

class TrackedSubscriptions extends React.Component {

  render() {
    
    const { userSubscriptions } = this.props.userSubscriptions;
    
    if (userSubscriptions.length > 0) {
      let allUserSubscriptions = (
        <div className="subscription-container">
          {userSubscriptions.map((userSub) => {
            return <Subscription key={userSub._id} {...userSub} />;
          })}
        </div>
      );
      return <>{allUserSubscriptions}</>;
    } else {
      return (
        <div>
          Add Subscriptions
        </div>
      )

    }
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
