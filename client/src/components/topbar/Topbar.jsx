import './topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import { SearchContext } from '../../context/search/SearchContext';
import { setSearchAction } from '../../context/search/SearchActions';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const { search, dispatch } = useContext(SearchContext);
  const searchParams = new URLSearchParams(window.location.search);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  return (
    <div className='topbarContainer'>
      <div className='topbarContent'>
        <div className='topbarLeft'>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <span className='logo'>Lamasocial</span>
          </Link>
        </div>
        <div className='topbarCenter'>
          <form
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
        </div>
        <div className='topbarRight'>
          <div className='topbarLinks'>
            <span className='topbarLink'>Homepage</span>
            <span className='topbarLink'>Timeline</span>
          </div>
          <div className='topbarIcons'>
            <div className='topbarIconItem'>
              <Person />
              <span className='topbarIconBadge'>1</span>
            </div>
            <div className='topbarIconItem'>
              <Chat />
              <span className='topbarIconBadge'>2</span>
            </div>
            <div className='topbarIconItem'>
              <Notifications />
              <span className='topbarIconBadge'>1</span>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}
