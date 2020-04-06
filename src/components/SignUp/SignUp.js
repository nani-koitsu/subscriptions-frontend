import React, { Component } from "react";
import GoogleSignin from "../Google/GoogleSignin";
import { connect } from "react-redux";
import { signup } from "../../redux/action/authUserAction";
import "../Forms/Form.css";

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

class Signup extends Component {
  state = {
    email: "",
    password: "",
    formErrors: {
      email: "",
      password: "",
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
      };
      this.props
        .signup(user)
        .then(() => {
          this.setState({
            email: "",
            password: "",
            formErrors: {
              email: "",
              password: "",
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
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
          <div className="class-btn-google-sign-in">
            <GoogleSignin />
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
