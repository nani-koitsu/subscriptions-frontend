import React, { Component } from "react";

import { connect } from "react-redux";
import { signup } from "../../redux/action/authUserAction";
import "../Forms/Form.css";
// import GoogleAuth from "../GoogleAuth/GoogleAuth";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const nameRegex = RegExp(/[0-9]/);

const phoneRegex = RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/);

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

class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    formErrors: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: ""
    },
  };

  componentDidMount() {
    if (this.props.authUser.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        === SUBMITTING
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      const user = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone
      };
      this.props
        .signup(user)
        .then(() => {
          this.setState({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            formErrors: {
              email: "",
              password: "",
              firstName: "",
              lastName: "",
              phone: ""
            },
          });
          this.props.history.push("/signin");
        })
        .catch((e) => {
          console.log(e);
          // const { message } = e.response.data;
          // this.setState({ error: message });
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
      case "firstName":
        formErrors.firstName =
          value.match(nameRegex) ? "please enter a valid name" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.match(nameRegex) ? "please enter a valid name" : "";
        break;
      case "phone":
        formErrors.phone =
          !value.match(phoneRegex) ? "please follow the correct format" : "";
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
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="names">
              <div className='firstName'>
                <label htmlFor="firstName">First Name</label>
                <input
                  className={formErrors.firstName.length > 0 ? "error" : null}
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>
              <div className='lastName'>
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={formErrors.lastName.length > 0 ? "error" : null}
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>
            </div>
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
            <div className="phone">
              <label htmlFor="phone">Phone Number</label>
              <input
                className={formErrors.phone.length > 0 ? "error" : null}
                placeholder="000-000-0000"
                type="tel"
                name="phone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phone.length > 0 && (
                <span className="errorMessage">{formErrors.phone}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
          <div className="class-btn-google-sign-in">
            {/* <GoogleAuth /> */}
            <a href='http://localhost:3001/api/auth/google'>
              <span>
                <div>
                  Sign In With Google
                </div>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
  };
};
export default connect(mapStateToProps, { signup })(Signup);
