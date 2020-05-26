import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// MUI
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Components
import Navbar from './components/Navbar'
// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import themeObj from './util/theme'
import jwtDecode from 'jwt-decode'
import AuthRoute from './util/AuthRoute'

//Redux 
import {Provider} from 'react-redux'
import store from './redux/store'
import {logoutUser, getUserData} from './redux/actions/userActions'
import {SET_AUTHENTICATED} from './redux/types'
import Axios from 'axios';
const theme = createMuiTheme(themeObj)
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    store.dispatch(logoutUser());
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    Axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
  console.log(decodedToken);
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
          <Router>
            <Navbar></Navbar>
            <div className="container">
                <Switch>
                  <Route exact path ="/" component={home}/>
                  <AuthRoute exact path ="/login" component={login}  />
                  <AuthRoute exact path ="/signup" component={signup} />
                </Switch>
            </div>
          </Router>
      </Provider>
      
    </MuiThemeProvider>
  );
}

export default App;
