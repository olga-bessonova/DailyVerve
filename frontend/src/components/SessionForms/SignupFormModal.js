import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './FormModal.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupFormModal (props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
      case 'firstName':
        setState = setFirstName;
        break;
      case 'lastName':
        setState = setLastName;
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
      firstName,
      lastName,
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
        
        <div className="firstName-div">
          <input className="firstName-login-input" type="text"
            value={firstName}
            onChange={update('firstName')}
            placeholder="First Name"
          />
        </div>
        <div className="errors">{errors?.firstName}</div>

        <div className="lastName-div">
          <input className="lastName-login-input" type="text"
            value={lastName}
            onChange={update('lastName')}
            placeholder="Last Name"
          />
        </div>
        <div className="errors">{errors?.lastName}</div>

        <div className="email-div">
          <input className="email-login-input" type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </div>
        <div className="errors">{errors?.email}</div>

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
          <label className="image_input_label" htmlFor="image_input_profile">Choose File</label>
          <input  className="image_input" id="image_input_profile" type="file" accept=".jpg, .jpeg, .png"
            onChange={updateFile}
          />
        </div>
        
        <div className="agree_span">            
            By clicking <span className="continue-span"> Continue </span>            
            I agree to subscribe to a <span className="continue-span"> Daily Verve </span> greeting emails             
        </div>

        <button type="submit" className="continue_button">Continue</button>

      </form>
    </div>
  );
}

export default SignupFormModal;
