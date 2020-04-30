import React, { Component } from "react";
import { connect } from "react-redux";
import { signin } from "../../redux/action/authUserAction";
import { getAllCloudinaryImages } from "../../redux/action/cloudinaryAction";
import GoogleButton from '../Button/GoogleButton'
import "../css/Form.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};
class Signin extends Component {
  state = {
    email: "",
    password: "",
    formErrors: {
      email: "",
      password: "",
    },
    error: "",
  };

  componentDidMount() {
    if (this.props.authUser.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    console.log(this.props.history.location)
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (formValid(this.state)) {
      console.log(`
        SUBMITTING
        Email: ${email}
        Password: ${password}
      `);
      const { signin, history, getAllCloudinaryImages } = this.props;
      const user = {
        email,
        password,
      };
      signin(user)
        .then(() => {
          this.setState({
            email: "",
            password: "",
          });
        })
        .then(() => history.push("/dashboard"))
        .then(() => getAllCloudinaryImages())
        .catch((e) => {
          // const { message } = e.response.data;
          // this.setState({ error: message });
          // throw new Error(e);
          console.log(e);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };


  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Sign In Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Sign In</button>
              <small>Don't Have an Account?</small>
            </div>
          </form>
          {/* <div className="class-btn-google-sign-in"> */}
          <div className="google-button__container">
            <GoogleButton />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
    cloudinaryList: state.cloudinaryList,
  };
};
export default connect(mapStateToProps, {
  signin,
  getAllCloudinaryImages,
})(Signin);
