import React, {Component} from 'react';
import './App.css';
import Main from './Main'
import {BrowserRouter} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './Components/SignUp/helperApis';
import store from './store';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { Provider } from 'react-redux';
//import { clearProfile } from './actions/profileActions';

//check for token
if(localStorage.jwtToken && localStorage.jwtToken !== "undefined"){
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user
  store.dispatch(setCurrentUser(decoded));
  
  //check for expired token
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime){
  store.dispatch(logoutUser());
  //store.dispatch(clearProfile);
  window.location.href = '/login';
  }
}

class App extends Component{
  render(){
    return (
      //Use Browser Router to route to different pages
      <Provider store={ store }>
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
