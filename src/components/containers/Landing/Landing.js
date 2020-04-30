import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { connect } from "react-redux";
import "../../css/Landing.css";
import video from './video/coding-video.vid'
class Landing extends Component {
  render() {

    console.log(this.props)
    return (
      <>
        {this.props.authUser.isAuthenticated ? (
          <Dashboard user={this.props.authUser.user} />
        ) : (
            <div className='landing-container'>
              <div className='bg-video'>
                <video className='video-content' autoPlay muted loop>
                  <source src={video}></source>
                </video>
              </div>
              <h1 className="class-landing-h1">Want to hack your Subscriptions?</h1>
            </div>
          )}
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};
export default connect(mapStateToProps, null)(Landing);
