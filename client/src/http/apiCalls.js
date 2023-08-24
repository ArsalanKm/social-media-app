import instance from '.';

export const loginCall = async (userCredential, dispatch) => {
  try {
    const res = await instance.post('/auth/login', userCredential);
    if (res.data.data.token) {
      localStorage.setItem('token', JSON.stringify(res.data.data.token));
      dispatch({ type: 'SET_TOKEN', payload: res.data.data.token });
    }

    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};
