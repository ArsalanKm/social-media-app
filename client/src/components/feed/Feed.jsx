import { useContext } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { AuthContext } from '../../context/auth/AuthContext';

export default function Feed({ username, posts, fetchPosts }) {
  const { user } = useContext(AuthContext);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post fetchPosts={fetchPosts} key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
