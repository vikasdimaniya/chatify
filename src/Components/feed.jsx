import React, { Component } from "react";
class Feed extends Component {
  state = {};
  render() {
    return <div>{this.props.data[0]}</div>;
  }
}

export default Feed;
