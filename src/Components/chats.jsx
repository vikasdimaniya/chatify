import React, { Component } from "react";
import Chat from "./chat";
class Chats extends Component {
  //it should contain all the chats
  state = {
    friendList: [],
    user: []
  };
  componentDidMount() {
    fetch(`http://localhost:3307/getSessionData?id=${localStorage.sessionId}`)
      .then(response => response.json())
      .then(response => this.setState({ user: response.data[0] }))
      .catch(err => console.error(err));
    fetch(
      `http://localhost:3307/friendListFetcher?email=${this.props.user.email}`
    )
      .then(response => response.json())
      .then(response => this.setState({ friendList: response.data }))
      .catch(err => console.error(err));
    this.setState({ firstTime: false });
  }

  render() {
    return (
      <div
        style={{
          position: "fixed",
          textAlign: "center",
          top: "15%",
          left: "88%"
        }}
      >
        {this.state.friendList ? (
          this.state.friendList.map(friend => (
            <Chat key={friend.name} friend={friend} />
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Chats;
