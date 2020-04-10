import React, { Component } from "react";
import Feed from "./feed";

class FeedContainer extends Component {
  state = {
    feedList: [],
    user: []
  };
  componentDidMount() {
    fetch(`http://localhost:3307/getSessionData?id=${localStorage.sessionId}`)
      .then(response => response.json())
      .then(response => this.setState({ user: response.data[0] }))
      .catch(err => console.error(err));

    fetch(
      `http://localhost:3307/feedListFetcher?email=${this.props.user.email}`
    )
      .then(response => response.json())
      .then(response => this.setState({ feedList: response.data }))
      .catch(err => console.error(err));
  }
  render() {
    return (
      <div
        className="container"
        style={{
          display: "inline-block",
          width: "65%",
          position: "absolute",
          top: "10%",
          left: "20%"
        }}
      >
        {this.state.feedList ? (
          this.state.feedList.map(feed => <Feed key={feed.id} data={feed} />)
        ) : (
          <div>Nobody is posting yet. Be the first one to post.</div>
        )}
      </div>
    );
  }
}

export default FeedContainer;
