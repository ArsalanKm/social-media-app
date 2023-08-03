import './post.css';
import { useContext, useEffect, useState } from 'react';
import { Chip, Button } from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

export default function Post({ post, fetchPosts }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put('/posts/' + post._id + '/like', { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const onDelete = (id) => {
    axios
      .post(`/posts/${id}`, { userId: currentUser._id })
      .then((res) => fetchPosts());
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=''
              />
            </Link>
            <span className='postUsername'>{user.username}</span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            {post.tags &&
              post.tags.length > 0 &&
              post.tags.map((el) => (
                <Chip
                  style={{ marginInlineEnd: '4px' }}
                  key={el._id}
                  label={el.name}
                  size='small'
                />
              ))}
            {post.userId === currentUser._id && (
              <Button
                onClick={() => onDelete(post._id)}
                style={{ height: '30px' }}
                variant='outlined'
                color='error'
              >
                حذف
              </Button>
            )}
            {post.userId !== currentUser._id && (
              <Button
                onClick={async () => {
                  let res = await axios.get(
                    `/conversations/find/${currentUser._id}/${user._id}`
                  );
                  if (!res.data) {
                    res = await axios.post(`/conversations`, {
                      senderId: currentUser._id,
                      receiverId: post.userId,
                    });
                  }
                  if (res.data) {
                    history.push({
                      pathname: '/messenger',
                      state: { conversationId: res.data._id },
                    });
                  }
                }}
                style={{ height: '30px' }}
                variant='outlined'
                color='info'
              >
                ارسال پیام
              </Button>
            )}
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img className='postImg' src={PF + post.img} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=''
            />
            <img
              className='likeIcon'
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>{like}نفر لایک کرده </span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment} کامنت</span>
          </div>
        </div>
      </div>
    </div>
  );
}
