import './sidebar.css';
import {
  DirectionsCarOutlined,
  HomeOutlined,
  DevicesOutlined,
  WorkOutline,
  School,
  CloseOutlined,
} from '@material-ui/icons';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import CloseFriend from '../closeFriend/CloseFriend';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/search/SearchContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { IconButton } from '@material-ui/core';
import instance from '../../http';

const iconData = [
  {
    name: 'خانه',
    icon: <HomeOutlined className='sidebarIcon' />,
  },
  {
    name: 'ماشین',
    icon: <DirectionsCarOutlined className='sidebarIcon' />,
  },
  {
    name: 'کالای دیجیتال',
    icon: <DevicesOutlined className='sidebarIcon' />,
  },
  {
    name: 'کتاب',
    icon: <School className='sidebarIcon' />,
  },
  {
    name: 'موقعیت شغلی',
    icon: <WorkOutline className='sidebarIcon' />,
  },
];
export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const { sidebar, dispatch: AuthDispatch, user } = useContext(AuthContext);

  const matches = useMediaQuery('(max-width:768px)');

  const [tags, setTags] = useState([]);

  const { dispatch, tag: searchedTag } = useContext(SearchContext);
  const [show, setShow] = useState(true);
  const queryParams = new URLSearchParams();
  useEffect(() => {
    if (user?._id)
      instance.get(`users/friends/${user._id}`).then((res) => setUsers(res.data));
  }, [user]);

  useEffect(() => {
    instance.get('/tags').then((res) => {
      setTags(res.data);
    });
  }, []);

  useEffect(() => {
    const paths = ['/messenger', '/login', '/register'];
    if (paths.includes(location.pathname) || !user) {
      setShow(false);
    } else setShow(true);
  }, [location.pathname, user]);
  const onClick = (title) => {
    let tag = title;
    if (title === searchedTag) {
      tag = '';
    }
    queryParams.append('tag', tag);
    history.push({
      pathname: window.location.href.pathname,
      search: `?${queryParams.toString()}`,
    });
    dispatch({ type: 'SET_TAG', payload: tag });
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`sidebar${sidebar ? '__mobile' : ''}`}>
      <div className='sidebarWrapper'>
        {matches && (
          <div className='closeIcon'>
            <IconButton
              onClick={() => {
                AuthDispatch({ type: 'SIDEBAR' });
              }}
            >
              <CloseOutlined />
            </IconButton>
          </div>
        )}
        <ul className='sidebarList'>
          {tags?.map((tag) => (
            <li
              key={tag.name}
              onClick={() => onClick(tag.name)}
              className={`sidebarListItem ${searchedTag === tag.name ? 'sidebarListItem--selected' : ''
                }`}
            >
              {iconData.find((el) => el.name === tag.name)?.icon}
              <span className='sidebarListItemText'>{tag.name}</span>
            </li>
          ))}
        </ul>
        {/* <button className='sidebarButton'>Show More</button> */}
        <hr className='sidebarHr' />
        <h3 className='sidebar__followings'>افرادی که دنبال کرده اید</h3>
        <ul className='sidebarFriendList'>
          {users?.map((u) => {
            const { username } = u;
            return (
              <Link key={u._id} to={`/profile/${username}`}>
                <CloseFriend user={u} />
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
