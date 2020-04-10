import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import BlankTop from "./blankTop";
class CreatePost extends Component {
  state = {
    data: ""
  };
  componentDidMount() {
    fetch(`http://localhost:3307/getSessionData?id=${localStorage.sessionId}`)
      .then(response => response.json())
      .then(response => this.setState({ user: response.data[0] }))
      .catch(err => console.error(err));
  }
  createPostDB = _ => {
    const { data } = this.state;
    fetch(
      `http://localhost:3307/fourms/posts/add?email=${this.state.user.email}&data=${data}`
    ).catch(err => console.error(err));
    document.getElementById("redirectToHome").click();
  };
  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <BlankTop />
        <a id="redirectToHome" href="/home"></a>
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
          >
            Dropdown button
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Link 1
            </a>
            <a className="dropdown-item" href="#">
              Link 2
            </a>
            <a className="dropdown-item" href="#">
              Link 3
            </a>
          </div>
        </div>
        <input
          type="text"
          value={data}
          onChange={e => this.setState({ data: e.target.value })}
        />
        <br />
        <Button onClick={this.createPostDB} onTouchEnd={this.createPostDB}>
          Post
        </Button>
      </React.Fragment>
    );
  }
}

export default CreatePost;
