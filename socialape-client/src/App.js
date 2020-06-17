import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
// Components
import { Navbar } from './components/layout/Navbar'
// UI stuff
import { MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// Utils
import configTheme from './util/theme'
import AuthRoute from './util/AuthRoute'
// Pages
import { Home } from './pages/Home'
import Login from './pages/Login'
import Signup  from './pages/Signup'
import { User } from './pages/User'
// Redux
import { SET_AUTHENTICATED } from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userActions'
import { Provider } from 'react-redux'
import store from './redux/store' 

axios.defaults.baseURL =
  "https://europe-west3-socialape-7fae2.cloudfunctions.net/api"

const theme = createMuiTheme(configTheme)
const token = localStorage.FBIdToken || undefined
  if (token){
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) { 
      store.dispatch(logoutUser())
      window.location.href='/login' 
    } 
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  } 

export const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <Route exact path="/users/:handle" component={User} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={User}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}


