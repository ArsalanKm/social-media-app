import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
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

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Topbar />
      <div className='my-app'>

        <Sidebar />

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
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
