import React, { Component } from "react";
// import GoogleSvg from "./google-logo.svg";
import { connect } from 'react-redux'
import { setAuthSuccessUser } from '../../redux/action/authUserAction'
// import "../css/GoogleAuth.css";
import queryString from 'query-string'
class GoogleAuth extends Component {

  componentDidMount() {

    let query = queryString.parse(this.props.location.search);
    let token = query.token;
    if (token) {
      this.props.setAuthSuccessUser(token)
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push('/');
    }
    // console.log('HELLOOOOO GOOGLE AUTH', this.props)
    // console.log(this.props.authUser)
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  // Probably dont need this
  return {
    authUser: state.authUser
  }
}
export default connect(mapStateToProps, { setAuthSuccessUser })(GoogleAuth)
