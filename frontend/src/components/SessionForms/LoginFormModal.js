import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './FormModal.css';


const LoginFormModal = (props) => {
  const user = useSelector(state => state.session.user); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const {setShowLoginModal} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(sessionActions.clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ email, password }))
      .then(res => {
        if (res.currentUser)  setShowLoginModal(false)
    });
  };

  const handleDemo = (e) => {
    dispatch(sessionActions.login({ 
      email: 'demo@user.io', 
      password: 'password' 
    }))
    .then(res => {
      if (res.currentUser)  setShowLoginModal(false)
    }); 
  };

  const handleOlga = (e) => {
    dispatch(sessionActions.login({ 
      email: 'olga.sleepless@gmail.com', 
      password: 'password' 
    }))
    .then(res => {
      if (res.currentUser)  setShowLoginModal(false)
    }); 
  };

  const handleStan = (e) => {
    dispatch(sessionActions.login({ 
      email: 'hekhtstanislau@gmail.com', 
      password: 'password' 
    }))
    .then(res => {
      if (res.currentUser)  setShowLoginModal(false)
    }); 
  };

  if (user) {
    return <Redirect to="/profile" />;
  };

  return (

    <div className='login-modal'>
      <div onClick={() => setShowLoginModal(false)} className="close-button">
        <i className="fa-solid fa-x"></i>
      </div>

      <header className="login-header">
        <div className="login-header-text">Log in</div>
      </header> 

      <form className="login-form" onSubmit={handleSubmit}>
        
        <div className="errors">{errors?.email}</div>
        
        <div className="email_div">
          <input className="email-login-input" type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </div>

        
        <div className="password-div">
          <input className="password-login-input" type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </div>
        <div className="errors">{errors?.password}</div>
        <button type="submit" className="continue_button" >Continue</button>

    </form>

        <div id="demo-button-div">
          <button className="demo_button" onClick={handleDemo}>Continue with Demo User</button>
        </div>  

        <div id="demo-button-div">
          <button className="demo_button" onClick={handleOlga}>Continue as Olga</button>
        </div>  

        <div id="demo-button-div">
          <button className="demo_button" onClick={handleStan}>Continue as Stan</button>
        </div>  
      

    </div>

    
  );
}

export default LoginFormModal;
