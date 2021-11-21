import React, {Component} from "react";
import {Link} from 'react-router-dom';
import './App.css';
import {useOktaAuth} from '@okta/okta-react';


const Header = () => {
  const {oktaAuth, authState} = useOktaAuth();
  const logout = async () => oktaAuth.signOut();

  return (

    <div className="headerContainer">
      <Link to='/homepage'>
        <div>Home Page</div>
      </Link>

      <div onClick={logout}>Log out</div>
    </div>
  );
};

export default Header;