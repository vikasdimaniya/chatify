import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
class NavBar extends Component {
  state = {
    user: []
  };

  logoutF = _ => {
    localStorage.clear();
    document.getElementById("redirectToLoginPage").click();
  };

  createFourm = _ => {
    this.props.createFourm();
  };
  createPost = _ => {
    this.props.createPost();
  };
  render() {
    return (
      <Navbar
        bg="dark"
        variant="dark"
        style={{ position: "fixed", width: "100%", zIndex: "1" }}
      >
        <Navbar.Brand href="/home">Chatify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <FormControl type="text" placeholder="Search" className="mr-mm-2" />
          <Button variant="outline-success">Search</Button>

          <a id="redirectToLoginPage" href="/"></a>

          <Nav style={{ position: "right" }}>
            <NavDropdown title={this.props.user.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

              <Button
                onClick={this.createPost}
                onTouchEnd={this.createPost}
                className="w-100 p-1"
              >
                New Post
              </Button>
              <Button
                onClick={this.createFourm}
                onTouchEnd={this.createFourm}
                className="w-100 p-1"
              >
                Create New Fourm
              </Button>

              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              <Button
                variant="danger"
                onClick={this.logoutF}
                onTouchEnd={this.logoutF}
                className="w-100 p-1"
              >
                logout
              </Button>
            </NavDropdown>
          </Nav>
          <div style={{ width: "10%" }}></div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
