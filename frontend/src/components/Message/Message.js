import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtFetch from '../../store/jwt.js';
import { logout } from '../../store/session';
// import './Message.css';

const Message = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);

  console.log(currentUser);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleSubmit = async () => {
    try {
      if (!prompt) {
        alert('Please enter a prompt.');
        return;
      }

      const response = await jwtFetch('/api/messages/', {
        body: JSON.stringify({
          prompt,
        }),
        method: 'POST',
      });

      const responseData = await response.json();

      setResponse(responseData.text);

      await jwtFetch('/api/messages/email/', {
        method: 'POST',
        body: JSON.stringify({
          text: responseData.text,
          email: currentUser.email,
        }),
      });
    } catch (error) {
      console.error(error);
      setResponse('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <form>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckedboxChange}
            
          />
        </label>

      </form>
      <div className='messages_container'>
        <h1>OpenAI Chat Interface</h1>
        <div>
          <label htmlFor='prompt'>Enter your prompt:</label>
          <input
            type='text'
            id='prompt'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
        {/* <button onClick={handleEmail}>Email</button> */}
        <button id='logout_button' onClick={logoutUser}>
          logout
        </button>
      </div>
    </>
  );
};

export default Message;
