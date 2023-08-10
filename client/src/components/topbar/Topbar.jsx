import './topbar.css';
import { Search, MenuOutlined } from '@material-ui/icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { SearchContext } from '../../context/search/SearchContext';

import { setSearchAction } from '../../context/search/SearchActions';
import { IconButton, Button } from '@mui/material';

export default function Topbar() {
  const { user, dispatch: AuthDispatch } = useContext(AuthContext);
  const { search, dispatch } = useContext(SearchContext);
  const searchParams = new URLSearchParams(window.location.search);
  const location = useLocation();
  const matches = useMediaQuery('(max-width:768px)');

  const show = !['/messenger', '/login', '/register'].includes(
    location.pathname
  );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  // if (location.pathname === '/messenger') {
  //   return null;
  // }
  return (
    <div className='topbarContainer'>
      <div className='topbarContent'>
        <div className={`${matches ? 'topbarRight' : ''}`}>
          <Link
            to='/'
            style={{ textDecoration: 'none', width: '200px', display: 'block' }}
          >
            <span className='logo'>خرید و فروش بهشتی</span>
          </Link>
          {matches && show && user && (
            <IconButton
              onClick={() => {
                if (window.location.pathname === '/messenger') {
                  AuthDispatch({ type: 'CONTACTS' });
                } else {
                  AuthDispatch({ type: 'SIDEBAR' });
                }
              }}
            >
              <MenuOutlined color='white' />
            </IconButton>
          )}
        </div>
        {/* <div className='topbarCenter'> */}
        {show && user && (
          <form
            className='form'
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ type: 'SET_MAKE_SEARCH' });
              searchParams.set('s', search);
              history.push({
                pathname: window.location.href.pathname,
                search: `?${searchParams.toString()}`,
              });
            }}
          >
            <div className='searchbar'>
              <Search className='searchIcon' />
              <input
                placeholder='جست و جو کنید...'
                className='searchInput'
                value={search}
                onChange={(e) => dispatch(setSearchAction(e.target.value))}
              />
            </div>
          </form>
        )}
        {/* </div> */}
        {/* <div className='topbarRight'> */}
        {/* <div className='topbarLinks'>
            <span className='topbarLink'>Homepage</span>
            <span className='topbarLink'>Timeline</span>
          </div> */}

        {user && (
          <div className='user-header'>
            <Button
              onClick={() => {
                AuthDispatch({ type: 'LOGOUT' });
                localStorage.removeItem('user');
                window.location.reload('/');
              }}
              variant='outlined'
              color='error'
            >
              خروج
            </Button>
            <Link
              style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
              to={`/profile/${user.username}`}
            >
              <>
                <span>{user?.username}</span>
                <img
                  src={
                    user.profilePicture
                      ? PF + user.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=''
                  className='topbarImg'
                />
              </>
            </Link>
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
