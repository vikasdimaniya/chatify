import React, { Component } from "react";
import SignupPage from "./signupPage";

class LoginPage extends Component {
  state = {
    loginStateActive: true,
    falsePasswordTrue: false,
    passwordV: [],
    user: {
      email: "",
      password: ""
    },
    sessionData: []
  };
  sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  componentDidMount() {
    var flag;
    flag = localStorage.getItem("sessionId");
    if (flag !== null) {
      this.props.credentialsVerificationSuccesfull();
    }
  }
  openSignUpPage = _ => {
    this.setState({ loginStateActive: false });
  };

  SetNewSession = _ => {
    fetch(
      `http://localhost:3307/setNewSessionId?email=${this.state.passwordV[0].email}&name=${this.state.passwordV[0].name}`
    )
      .then(response => response.json())
      .catch(err => console.error(err));
  };
  GetNewSessionId = _ => {
    fetch(
      `http://localhost:3307/getSessionId?email=${this.state.passwordV[0].email}`
    )
      .then(response => response.json())
      .then(response => localStorage.setItem("sessionId", response.data[0].id))
      .catch(err => console.error(err));
    console.log(localStorage.sessionId);
  };

  comparePasswords = _ => {
    if (this.state.passwordV.length > 0) {
      const pass = this.state.passwordV[0].password;
      if (this.state.user.password.localeCompare(pass) === 0) {
        this.SetNewSession();
        this.GetNewSessionId();

        localStorage.setItem("email", this.state.passwordV[0].email);
        this.props.setUser(this.state.passwordV[0]);
        setTimeout(this.props.credentialsVerificationSuccesfull(), 10000);
      } else {
        this.setState({ falsePasswordTrue: true });
      }
    } else {
      this.setState({ falsePasswordTrue: true });
    }
  };
  fetchLoginCredentials = _ => {
    fetch(
      `http://localhost:3307/passwordFetcher?email=${this.state.user.email}`
    )
      .then(response => response.json())
      .then(response => this.setState({ passwordV: response.data }))
      .catch(err => console.error(err));
  };
  checkLoginCredentials = _ => {
    this.fetchLoginCredentials();
    setTimeout(this.comparePasswords, 20); //because fetch is asynchronous and java script has no sleep fuction so 20 ms wait is required
    //this.compare will start a new thread after 20 ms and checklogincredentials will keep on running without any waitsewt
  };
  signupStateDeactivate = _ => {
    this.setState({ loginStateActive: true });
  };
  render() {
    if (this.state.loginStateActive) {
      const { user } = this.state;
      return (
        <div>
          Enter Login credentials
          <div>
            email
            <input
              id="emailInputField"
              value={user.email}
              onChange={e =>
                this.setState({ user: { ...user, email: e.target.value } })
              }
            />
            <br />
            password
            <input
              id="passwordInputField"
              type="password"
              value={user.password}
              onChange={e =>
                this.setState({ user: { ...user, password: e.target.value } })
              }
            />
            <br />
            <button
              id="submitButton"
              className="btn btn-primary btn-sm m-2"
              onClick={this.checkLoginCredentials}
              onTouchEnd={this.checkLoginCredentials}
            >
              Login
            </button>
            <button
              className="btn btn-primary btn-sm m-2"
              onClick={this.openSignUpPage}
              onTouchEnd={this.openSignUpPage}
            >
              Signup
            </button>
            {this.state.falsePasswordTrue ? "WORNG PASSWORD OR EMAIL" : ""}
          </div>
        </div>
      );
    } else
      return <SignupPage signupStateDeactivate={this.signupStateDeactivate} />;
  }
}
export default LoginPage;
