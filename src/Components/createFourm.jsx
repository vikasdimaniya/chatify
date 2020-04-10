import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import BlankTop from "./blankTop";
class CreateFourm extends Component {
  state = {
    name: ""
  };
  componentDidMount() {
    fetch(`http://localhost:3307/getSessionData?id=${localStorage.sessionId}`)
      .then(response => response.json())
      .then(response => this.setState({ user: response.data[0] }))
      .catch(err => console.error(err));
  }
  createFourmDB = _ => {
    const { name } = this.state;
    fetch(`http://localhost:3307/fourms/add?name=${name}`).catch(err =>
      console.error(err)
    );
  };
  render() {
    const { name } = this.state;
    return (
      <React.Fragment>
        <BlankTop />
        <input
          type="text"
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <br />
        <Button onClick={this.createFourmDB} onTouchEnd={this.createFourmDB}>
          CREATE
        </Button>
      </React.Fragment>
    );
  }
}

export default CreateFourm;
