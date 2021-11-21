import React from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {useOktaAuth} from '@okta/okta-react';
import './App.css';

const Home = () => {
  const history = useHistory();
  const {oktaAuth, authState} = useOktaAuth();

  console.log(authState, 'authState in Home.js');

  if (!authState) return null;

  const login = async () => history.push('/login');

  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ?
    <button className="LoginButton" onClick={logout}>Logout</button> :
    <button className="LoginButton" onClick={login}>Login</button>;

  return (
    <React.Fragment>
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '30px auto', maxWidth: '500px'}}>
        <Link to='/'>Home</Link><br/>
        <Link to='/homepage'>Protected Routes</Link><br/>
        {button}
      </div>
      <div style={{
        textAlign: 'center',
        backgroundColor: '#d4d4aa',
        padding: '8px'
      }}>{authState.isAuthenticated ? 'User is logged in' : 'User is logged out'}</div>
      <div style={{fontSize: '150px', textAlign: 'center'}}>
        Landing Page
        <div>Okta Integrated Application</div>
      </div>
    </React.Fragment>
  );
};
export default Home;
