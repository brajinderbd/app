import React from 'react';
import {Route, useHistory, Switch} from 'react-router-dom';
import {Security, SecureRoute, LoginCallback} from '@okta/okta-react';
import {OktaAuth, toRelativeUrl} from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import {oktaAuthConfig, oktaSignInConfig} from './config';
import EditPost from "./EditPost";
import ShowPhotos from "./ShowPhotos";
import Header from "./Header";
import Footer from "./Footer";

const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri = '/homepage', window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >

      <Switch>
        <Route path='/' exact={true} component={Home}/>
        <SecureRoute path='/homepage' component={Protected}/>
        <SecureRoute path='/editpost' component={EditPost}/>
        <SecureRoute path='/showphotos' component={ShowPhotos}/>
        <Route path='/login' render={() => <Login config={oktaSignInConfig}/>}/>
        <Route path='/login/callback' component={LoginCallback}/>
      </Switch>

    </Security>
  );
};
export default AppWithRouterAccess;
