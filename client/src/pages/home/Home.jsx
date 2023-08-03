import Feed from '../../components/feed/Feed';

import axios from 'axios';
import './home.css';
import { AuthContext } from '../../context/auth/AuthContext';
import { SearchContext } from '../../context/search/SearchContext';
import { useCallback, useState, useContext } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(AuthContext);
  const { tag, search, makeSearch, dispatch } = useContext(SearchContext);
  const searchParams = new URLSearchParams(window.location.search);
  const searchedTag = searchParams.get('tag');
  const searchedText = searchParams.get('s');
  const location = useLocation();
  const [posts, setPosts] = useState([]);


  const fetchPosts = useCallback(
    async (tag, searchedText) => {
      const res = await axios.get(
        `posts/timeline/` +
        user._id +
        `?tag=${decodeURIComponent(tag)}&s=${decodeURI(searchedText)}`
      );
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    },
    []
  );

  useEffect(() => {
    dispatch({ type: 'SET_TAG', payload: searchedTag });
    dispatch({ type: 'SET_SEARCH', payload: searchedText });
  }, [searchedTag, searchedText]);

  useEffect(() => {
    // if (makeSearch) {
    fetchPosts(tag, search);
    // }
  }, [makeSearch, tag, location]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className='homeContainer'>
        <Feed
          posts={posts}
          fetchPosts={fetchPosts}
        />
        {/* <Rightbar /> */}
      </div>
    </>
  );
}
