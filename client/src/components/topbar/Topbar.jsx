import './topbar.css';
import { Search, MenuOutlined } from '@material-ui/icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { SearchContext } from '../../context/search/SearchContext';

import { setSearchAction } from '../../context/search/SearchActions';
import { IconButton } from '@material-ui/core';

export default function Topbar() {
  const { user, dispatch: AuthDispatch } = useContext(AuthContext);
  const { search, dispatch } = useContext(SearchContext);
  const searchParams = new URLSearchParams(window.location.search);
  const matches = useMediaQuery('(max-width:768px)');

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  return (
    <div className='topbarContainer'>
      <div className='topbarContent'>
        <div className={`${matches ? 'topbarRight' : ''}`}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <span className='logo'>خرید و فروش بهشتی</span>
          </Link>
          {matches && (
            <IconButton onClick={() => {
              AuthDispatch({ type: 'SIDEBAR' });
            }}>

              <MenuOutlined color='white'

              />
            </IconButton>
          )}
        </div>
        {/* <div className='topbarCenter'> */}
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
              placeholder='Search for friend, post or video'
              className='searchInput'
              value={search}
              onChange={(e) => dispatch(setSearchAction(e.target.value))}
            />
          </div>
        </form>
        {/* </div> */}
        {/* <div className='topbarRight'> */}
        {/* <div className='topbarLinks'>
            <span className='topbarLink'>Homepage</span>
            <span className='topbarLink'>Timeline</span>
          </div> */}

        {user && (
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
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
