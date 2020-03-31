import React from "react";
import { connect } from "react-redux";
import UserSubscription from "./UserSubscriptions/UserSubscription";
import { getAllUserSubscriptions } from "../../redux/action/subscriptionAction";

class TrackedSubscriptions extends React.Component {
  render() {
    const { userSubscriptions } = this.props.userSubscriptions;
    let allUserSubscriptions = (
      <>
        {userSubscriptions.map(userSub => {
          return <UserSubscription key={userSub._id} {...userSub} />;
        })}
      </>
    );
    return <>{allUserSubscriptions}</>;
  }
}

const mapStateToProps = state => {
  return {
    userSubscriptions: state.userSubscriptions
  };
};

export default connect(mapStateToProps, { getAllUserSubscriptions })(
  TrackedSubscriptions
);

// container
