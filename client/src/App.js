import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';

import { createTheme } from '@mui/material/styles';
import Topbar from './components/topbar/Topbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/auth/AuthContext';
import Messenger from './pages/messenger/Messenger';
import Sidebar from './components/sidebar/Sidebar';
import './app.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const theme = createTheme({
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
});

function App() {
  const { user, snackbar, dispatch } = useContext(AuthContext);
  return (
    <Router>
      <Topbar />
      <div className='my-app'>
        <Sidebar />
        <Snackbar
          style={{ width: '400px' }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          vertical='bottom'
          open={snackbar}
          autoHideDuration={2000}
          onClose={() => dispatch({ type: 'SNACKBAR' })}
        >
          <Alert severity='error'>اکانت نا معتبر</Alert>
        </Snackbar>
        <Switch>
          <Route exact path='/'>
            {user ? <Home /> : <Register />}
          </Route>
          <Route path='/login'>{user ? <Redirect to='/' /> : <Login />}</Route>
          <Route path='/register'>
            {user ? <Redirect to='/' /> : <Register />}
          </Route>
          <Route path='/messenger'>
            {!user ? <Redirect to='/' /> : <Messenger />}
          </Route>
          <Route path='/profile/:username'>
            {!user ? <Redirect to='/' /> : <Profile />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
