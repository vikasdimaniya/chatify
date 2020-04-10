import React, { Component } from "react";
class SignupPage extends Component {
  state = {
    user: {
      email: "",
      password: "",
      name: ""
    }
  };
  adduser = _ => {
    const { user } = this.state;
    fetch(
      `http://localhost:3307/users/add?name=${user.name}&email=${user.email}&password=${user.password}`
    )
      .then(this.props.signupStateDeactivate())
      .catch(err => console.error(err));
  };
  render() {
    const { user } = this.state;
    return (
      <div>
        ADD NEW user
        <div>
          name
          <input
            value={user.name}
            onChange={e =>
              this.setState({ user: { ...user, name: e.target.value } })
            }
          />
          <br />
          email
          <input
            value={user.email}
            onChange={e =>
              this.setState({ user: { ...user, email: e.target.value } })
            }
          />
          <br />
          password
          <input
            type="password"
            value={user.password}
            onChange={e =>
              this.setState({ user: { ...user, password: e.target.value } })
            }
          />
          <br />
          <button onClick={this.adduser} onTouchEnd={this.adduser}>
            Add user
          </button>
        </div>
      </div>
    );
  }
}

export default SignupPage;
