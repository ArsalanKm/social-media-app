import React from 'react';
import './authInfo.css';

const AuthInfo = ({ children }) => {
 return (
  <div className='login'>
   <div className='loginWrapper'>
    <div className='loginLeft'>
     <h3 className='loginLogo'>خرید و فروش بهشتی</h3>
     <span className='loginDesc'>
      در این سامانه با هم دانشگاهی های خود خرید و فروش کنید
     </span>
    </div>
    <div className='loginRight'>{children}</div>
   </div>
  </div>
 );
};

export default AuthInfo;
