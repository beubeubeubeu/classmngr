import React, { Component } from "react";
import AuthService from "../api/services/auth";

import './style.css';

interface ProfileProps {
  name?: any;
  value?: any;
  history?: any
}

interface ProfileState { 
  currentUser : {
    accessToken : String,
    roles : [],
    email : string,
    id : string,
    username: string
  }
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
  
  constructor(props : any) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }
  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role : any, index : any) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}