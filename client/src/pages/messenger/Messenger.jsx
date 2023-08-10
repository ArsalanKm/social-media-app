import './messenger.css';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import { IconButton, Button } from '@mui/material';

import { CloseOutlined } from '@material-ui/icons';
// import ChatOnline from '../../components/chatOnline/ChatOnline';
import { useContext, useEffect, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';
import { io } from 'socket.io-client';
import instance from '../../http';

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const matches = useMediaQuery('(max-width:768px)');

  const socket = useRef();
  const { user, contacts, dispatch } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:8900');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const current = conversations.find(
      (el) => el._id === location?.state?.conversationId
    );
    if (current) {
      setCurrentChat(current);
    }
  }, [location?.state?.conversationId, conversations]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    // socket.current.on('getUsers', (users) => {
    //   setOnlineUsers(
    //     user.followings.filter((f) => users.some((u) => u.userId === f))
    //   );
    // });
  }, [user]);

  useEffect(
    () => {
      const getConversations = async () => {
        try {
          const res = await instance.get('/conversations/' + user._id);
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    },
    [user._id],
    currentChat
  );

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await instance.get('/messages/' + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await instance.post('/messages', message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className='messenger'>
        <div
          className={`${matches && contacts ? 'chatMenu__mobile' : 'chatMenu'}`}
        >
          {matches && (
            <IconButton
              onClick={() => {
                dispatch({ type: 'CONTACTS' });
              }}
            >
              <CloseOutlined />
            </IconButton>
          )}
          <div className='chatMenuWrapper'>
            {conversations.map((c, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
                <Conversation
                  currentChat={currentChat}
                  conversation={c}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='chat'>
          {matches && (
            <Button
              onClick={() => {
                dispatch({ type: 'CONTACTS' });
              }}
              color='info'
            >
              لیست مخاطبان
            </Button>
          )}
          <div className='chatBox'>
            <div className='chatBoxWrapper'>
              {currentChat ? (
                <>
                  <div className='chatBoxTop'>
                    {messages.map((m, index) => (
                      <div key={index} ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className='chatBoxBottom'>
                    <textarea
                      className='chatMessageInput'
                      placeholder=' ...پیام خود را بنویسید'
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit}>
                      ارسال
                    </button>
                  </div>
                </>
              ) : (
                <span className='noConversationText'>
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
        </div>
        {/* <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
          <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </>
  );
}
