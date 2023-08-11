import './share.css';
import { PermMedia, Label, Cancel } from '@material-ui/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/auth/AuthContext';
import TagMultiSelect from '../../components/tagMultiSelect';
import instance from '../../http';

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (user?._id) instance.get('/tags').then((res) => setTags(res.data));
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      tags: selectedTags.map((el) => el._id),
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;
      try {
        await instance.post('/upload', data);
      } catch (err) { }
    }
    try {
      await instance.post('/posts', newPost);
      window.location.reload();
    } catch (err) { }
  };

  const handleTagClick = (el) => {
    let items = selectedTags;
    if (items.find((item) => el._id === item._id)) {
      items = items.filter((item) => item._id !== el._id);
    } else {
      items.push(el);
    }
    setSelectedTags(items);
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt=''
          />
          <input
            placeholder={user?.username + ' اگهی های خود را اشتراک بذارید '}
            className='shareInput'
            ref={desc}
          />
        </div>
        <hr className='shareHr' />
        {file && (
          <div className='shareImgContainer'>
            <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
          </div>
        )}
        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>
            <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>عکس</span>
              <input
                style={{ display: 'none' }}
                type='file'
                id='file'
                accept='.png,.jpeg,.jpg'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>تگ</span>
              <TagMultiSelect onclick={handleTagClick} tags={tags} />
            </div>
          </div>
          <button className='shareButton' type='submit'>
            اشتراک
          </button>
        </form>
      </div>
    </div>
  );
}
