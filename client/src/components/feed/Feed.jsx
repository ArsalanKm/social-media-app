import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';

export default function Feed({ posts, fetchPosts }) {

  return (
    <div className='feed'>
      <Share />
      {posts.map((p) => (
        <Post fetchPosts={fetchPosts} key={p._id} post={p} />
      ))}
    </div>
  );
}
