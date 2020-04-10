import React, { Component } from "react";
import Button from "react-bootstrap/Button";
class Chat extends Component {
  state = {};

  render() {
    return (
      <div>
        <Button>{this.props.friend.name}</Button>
      </div>
    );
  }
}

export default Chat;
