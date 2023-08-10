import { useRef } from 'react';
import './register.css';
import { useHistory } from 'react-router';
import AuthInfo from '../../components/authIntro';
import instance from '../../http';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await instance.post('/auth/register', user);
        history.push('/login');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <AuthInfo>
      <form className='loginBox' onSubmit={handleClick}>
        <input
          placeholder='نام'
          required
          ref={username}
          className='loginInput'
        />
        <input
          placeholder='ایمیل'
          required
          ref={email}
          className='loginInput'
          type='email'
        />
        <input
          placeholder='رمزعبور'
          required
          ref={password}
          className='loginInput'
          type='password'
          minLength='6'
        />
        <input
          placeholder='تکرار رمز عبور'
          required
          ref={passwordAgain}
          className='loginInput'
          type='password'
        />
        <button className='loginButton' type='submit'>
          ساخت اکانت
        </button>
        <button
          onClick={() => {
            history.push('/login');
          }}
          className='loginRegisterButton'
        >
          وارد شدن
        </button>
      </form>
    </AuthInfo>
  );
}
