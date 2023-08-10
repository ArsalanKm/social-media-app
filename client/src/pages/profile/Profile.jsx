import './profile.css';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useEffect, useState, useCallback, useContext } from 'react';
import { SearchContext } from '../../context/search/SearchContext';
import { useParams } from 'react-router';
import instance from '../../http';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const username = useParams().username;
  const { tag, search, makeSearch } = useContext(SearchContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await instance.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  const fetchPosts = useCallback(
    async (tag, search) => {
      const res = username
        ? await instance.get(
          '/posts/profile/' +
          username +
          `?tag=${decodeURIComponent(tag)}&s=${decodeURI(search)}`
        )
        : await instance.get(
          'posts/timeline/' +
          user._id +
          `?tag=${decodeURIComponent(tag)}&s=${decodeURI(search)}`
        );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    },
    [username, user._id]
  );

  useEffect(() => {
    // if (makeSearch) {
    fetchPosts(tag, search);
    // }
  }, [makeSearch, tag, fetchPosts, search]);

  useEffect(() => {
    fetchPosts();
  }, [username, user._id, fetchPosts]);

  return (
    <>
      <div className='profile'>
        <Rightbar user={user} />
        <Feed posts={posts} username={username} fetchPosts={fetchPosts} />
      </div>
    </>
  );
}
