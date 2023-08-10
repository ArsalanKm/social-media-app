import instance from './http';

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    const res = await instance.post('/auth/login', userCredential);
    localStorage.setItem('token', JSON.stringify(res.data.data.token));

    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};
