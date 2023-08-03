import './sidebar.css';
import {
  DirectionsCarOutlined,
  HomeOutlined,
  DevicesOutlined,
  WorkOutline,
  Event,
  School,
  CloseOutlined,
} from '@material-ui/icons';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react';
import CloseFriend from '../closeFriend/CloseFriend';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/search/SearchContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { IconButton } from '@material-ui/core';

export default function Sidebar() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const { sidebar, dispatch: AuthDispatch, user } = useContext(AuthContext);

  const matches = useMediaQuery('(max-width:768px)');

  const { dispatch } = useContext(SearchContext);
  const [show, setShow] = useState(true);
  const queryParams = new URLSearchParams();
  useEffect(() => {
    axios.get(`/users/friends/${user._id}`).then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    const paths = ['/messenger', '/login', '/register'];
    if (paths.includes(location.pathname)) {
      setShow(false);
    } else setShow(true);
  }, [location.pathname]);
  const onClick = (title) => {
    queryParams.append('tag', title);
    history.push({
      pathname: window.location.href.pathname,
      search: `?${queryParams.toString()}`,
    });
    dispatch({ type: 'SET_TAG', payload: title });
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`sidebar${sidebar ? '__mobile' : ''}`}>
      <div className='sidebarWrapper'>
        <div className='closeIcon'>
          {matches && (
            <IconButton
              onClick={() => {
                AuthDispatch({ type: 'SIDEBAR' });
              }}
            >
              <CloseOutlined />
            </IconButton>
          )}
        </div>
        <ul className='sidebarList'>
          <li onClick={() => onClick('jobs')} className='sidebarListItem'>
            <DirectionsCarOutlined className='sidebarIcon' />
            <span className='sidebarListItemText'>Feed</span>
          </li>
          <li
            onClick={() => onClick('کالای دیجیتال')}
            className='sidebarListItem'
          >
            <HomeOutlined className='sidebarIcon' />
            <span className='sidebarListItemText'>Chats</span>
          </li>
          <li onClick={() => onClick('jobs')} className='sidebarListItem'>
            <DevicesOutlined className='sidebarIcon' />
            <span className='sidebarListItemText'>Videos</span>
          </li>

          <li
            onClick={() => onClick('کالای دیجیتال')}
            className='sidebarListItem'
          >
            <WorkOutline className='sidebarIcon' />
            <span className='sidebarListItemText'>Jobs</span>
          </li>
          <li onClick={() => onClick('jobs')} className='sidebarListItem'>
            <Event className='sidebarIcon' />
            <span className='sidebarListItemText'>Events</span>
          </li>
          <li onClick={() => onClick('jobs')} className='sidebarListItem'>
            <School className='sidebarIcon' />
            <span className='sidebarListItemText'>Courses</span>
          </li>
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
