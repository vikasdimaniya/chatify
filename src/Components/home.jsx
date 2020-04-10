import React, { Component } from "react";

import NavBar from "./navbar";
import CreateFourm from "./createFourm";
import CreatePost from "./createPost";
import BLankTop from "./blankTop";
import Chats from "./chats";
import FeedContainer from "./feedContainer";
class Home extends Component {
  state = {
    createFourmFlag: false,
    createPostFlag: false,
    user: [],
    sessionId: ""
  };
  componentDidMount() {
    if (localStorage.sessionId) {
      fetch(`http://localhost:3307/getSessionData?id=${localStorage.sessionId}`)
        .then(response => response.json())
        .then(response => this.setState({ user: response.data[0] }))
        .catch(err => console.error(err));
    }
  }
  createFourm = _ => {
    this.setState({ createFourmFlag: true });
    this.setState({ createPostFlag: false });
  };
  createPost = _ => {
    this.setState({ createPostFlag: true });
    this.setState({ createFourmFlag: false });
  };
  render() {
    if (this.state.createFourmFlag === true) {
      return (
        <div>
          <NavBar
            id="navBar"
            user={this.state.user}
            createFourm={this.createFourm}
            createPost={this.createPost}
          />
          <CreateFourm user={this.state.user} />
          <FeedContainer user={this.state.user} />
          <Chats user={this.state.user} />
        </div>
      );
    } else if (this.state.createPostFlag === true) {
      return (
        <div>
          <NavBar
            id="navBar"
            user={this.state.user}
            createFourm={this.createFourm}
            createPost={this.createPost}
          />
          <FeedContainer user={this.state.user} />
          <CreatePost user={this.state.user} />
          <Chats user={this.state.user} />
        </div>
      );
    } else {
      return (
        <div>
          {console.log(this.state.user)}
          <NavBar
            id="navBar"
            user={this.state.user}
            createFourm={this.createFourm}
            createPost={this.createPost}
          />
          <BLankTop />
          <FeedContainer user={this.state.user} />
          <Chats user={this.state.user} />
          {console.log(this.state.user)}
        </div>
      );
    }
  }
}

export default Home;
