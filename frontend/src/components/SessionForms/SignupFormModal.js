import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupFormModal (props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [image, setImage] = useState(null);
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const { setShowSignupModal } = props;


  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      image,
      password
    };

    dispatch(signup(user))
      .then(res => {
        if (res.currentUser)  setShowSignupModal(false)
    }); 
  };

  const updateFile = e => setImage(e.target.files[0]);

  return (
    <div className='login-modal'>

        <div onClick={() => setShowSignupModal(false)} className="close-button">
          <i className="fa-solid fa-x"></i>
        </div>

        <header className="login-header">
          <div className="login-header-text">Sign up</div>
        </header> 

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="email-div">
          <input className="email-login-input" type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </div>
        <div className="errors">{errors?.email}</div>


        <div className="username-div">
          <input className="username-login-input" type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
        </div>
        <div className="errors">{errors?.username}</div>

        <div>
          <input className="password-login-input" type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </div>
        <div className="errors">{errors?.password}</div>

        
        <div>
          <input  className="password-login-input" type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
          />
        </div>
        <div className="errors">
          {password !== password2 && 'Confirm Password field must match'}
        </div>

        <div className='profile_image_container'>
          <span>Profile Image</span>
          <label className="image_input_label" for="image_input_profile">Choose File</label>
          <input  className="image_input" id="image_input_profile" type="file" accept=".jpg, .jpeg, .png"
            onChange={updateFile}
          />
        </div>
        
        <div className="agree-message">            
            By clicking <span className="continue-span"> Continue </span>
            
            I agree to Trip Club's  
            
            <span className="agree_span" target="_blank" rel="noopener noreferrer"><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">  Terms of Service</a></span>
            and
            <span className="agree_span" target="_blank" rel="noopener noreferrer"><a href="https://www.youtube.com/watch?v=DiBmfcYaBoI&t=4s"> Privacy Policy</a></span>
        </div>

        <button type="submit" className="continue_button">Continue</button>

      </form>
    </div>
  );
}

export default SignupFormModal;
