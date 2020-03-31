import React, { Component } from "react";
import { connect } from "react-redux";
import UserSubscription from "./UserSubscriptions/UserSubscription";
import { getAllUserSubscriptions } from '../../redux/action/subscriptionAction';


class TrackedSubscriptions extends Component {

  componentDidMount() {
    let id = this.props.authUser.user.id;
    this.props.getAllUserSubscriptions(id);
    console.log(this.props)
  }

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
    userSubscriptions: state.userSubscriptions,
    authUser: state.authUser
  };
};

export default connect(mapStateToProps, { getAllUserSubscriptions })(TrackedSubscriptions);

//  {
//         userSubscriptions.map( subscription => (
//           return(
//             <>
//             <UserSubscription {...userSubscriptions}/>
//           </>
//           )
//         ))
//       }
