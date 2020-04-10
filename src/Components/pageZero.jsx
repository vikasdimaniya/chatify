import React, { Component } from "react";
import LoginPage from "./login&signup/loginPage";
import Home from "./home";
class PageZero extends Component {
  state = {
    user: "",
    isLoggedIn: false
  };
  setUser = userData => {
    this.setState({ user: userData });
  };
  credentialsVerificationSuccesfull = _ => {
    this.setState({ isLoggedIn: true });
  };
  render() {
    if (this.state.isLoggedIn === false) {
      return (
        <LoginPage
          credentialsVerificationSuccesfull={
            this.credentialsVerificationSuccesfull
          }
          setUser={this.setUser}
        />
      );
    } else return <Home user={this.state.user} />;
  }
}

export default PageZero;
