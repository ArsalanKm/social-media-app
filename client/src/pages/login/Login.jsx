import { useContext, useRef } from 'react';
import './login.css';
import { useHistory } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/auth/AuthContext';
import { CircularProgress } from '@material-ui/core';
import AuthInfo from '../../components/authIntro';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const history = useHistory();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <AuthInfo>
      <form className='loginBox' onSubmit={handleClick}>
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <input
            placeholder='ایمیل'
            type='email'
            required
            className='loginInput'
            ref={email}
          />
          <input
            placeholder='رمز عبور'
            type='password'
            required
            minLength='6'
            className='loginInput'
            ref={password}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
          <button className='loginButton' type='submit' disabled={isFetching}>
            {isFetching ? (
              <CircularProgress color='white' size='20px' />
            ) : (
              'وارد شوید'
            )}
          </button>
          {/* <span className="loginForgot">Forgot Password?</span> */}
          <button
            onClick={() => {
              if (!isFetching) {
                history.push('/register');
              }
            }}
            className='loginRegisterButton'
          >
            {isFetching ? (
              <CircularProgress color='white' size='20px' />
            ) : (
              'اکانت جدید بسازید'
            )}
          </button>
        </div>
      </form>
    </AuthInfo>
  );
}
