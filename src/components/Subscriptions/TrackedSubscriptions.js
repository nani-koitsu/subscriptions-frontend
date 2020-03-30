import React from "react";
import { connect } from "react-redux";
import UserSubscription from "./UserSubscriptions/UserSubscription";
class TrackedSubscriptions extends React.Component {
  render() {
    const { userSubscriptions } = this.props.userSubscriptions;
    let allUserSubscriptions = (
      <>
        {userSubscriptions.map(userSub => {
          return (
            <>
              {" "}
              <UserSubscription {...userSub} />
            </>
          );
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

export default connect(mapStateToProps, {})(TrackedSubscriptions);

//  {
//         userSubscriptions.map( subscription => (
//           return(
//             <>
//             <UserSubscription {...userSubscriptions}/>
//           </>
//           )
//         ))
//       }
