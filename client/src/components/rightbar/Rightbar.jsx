import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { Add, Remove } from '@material-ui/icons';
import instance from '../../http';

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    if (currentUser.followings.includes(user?._id)) {
      setFollowed(true);
    }
  }, [currentUser.followings, user?._id]);

  // useEffect(() => {
  //   instance.get('/users').then((res) => console.log(res));
  // }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user?._id) {
          const friendList = await instance.get('/users/friends/' + user?._id);
          if (friendList) {
            setFriends(friendList.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user?._id, followed]);

  const handleClick = async () => {
    try {
      if (followed) {
        await instance.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'UNFOLLOW', payload: user._id });
      } else {
        await instance.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'FOLLOW', payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) { }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src='assets/gift.png' alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className='rightbarAd' src='assets/ad.png' alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className='rightbarFollowButton' onClick={handleClick}>
            {followed ? 'رفع دنبال کردن' : 'دنبال کردن'}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className='rightbarTitle'>اطلاعات کاربر</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>ایمیل :</span>
            <span className='rightbarInfoValue'>{user.email}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>نام :</span>
            <span className='rightbarInfoValue'>{user.username}</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>followings</h4>
        <div className='rightbarFollowings'>
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={'/profile/' + friend.username}
              style={{ textDecoration: 'none' }}
            >
              <div className='rightbarFollowing'>
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + 'person/noAvatar.png'
                  }
                  alt=''
                  className='rightbarFollowingImg'
                />
                <span className='rightbarFollowingName'>{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
