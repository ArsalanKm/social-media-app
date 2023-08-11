import { useEffect, useState } from 'react';
import instance from '../../http';
import './conversation.css';

export default function Conversation({
  online,
  conversation,
  currentUser,
  currentChat,
}) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await instance('/users?userId=' + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div
      className={`conversation conversation${currentChat?._id === conversation?._id ? '__selected' : ''
        }`}
    >
      <img
        className='conversationImg'
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + 'person/noAvatar.png'
        }
        alt=''
      />
      {online && <div className='chatOnlineBadge'></div>}
      <span className='conversationName'>{user?.username}</span>
    </div>
  );
}
