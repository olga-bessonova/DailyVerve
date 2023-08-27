import React, { useState } from 'react';
import axios from 'axios';
import jwtFetch from '../../store/jwt.js';
// import './Message.css';

const Message = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      if (!prompt) {
        alert('Please enter a prompt.');
        return;
      }

      const response = await jwtFetch('/api/messages/', { 
        // body: prompt,
        body: JSON.stringify(prompt),
        method: 'POST' 
      });
      console.log(response)
      const responseData = response.data;
      const message = responseData.choices[0].message.content;
      setResponse(message);
    } catch (error) {
      console.error(error);
      setResponse('An error occurred. Please try again.');
    }
  };

  return (
    <div className="messages_container">
      <h1>OpenAI Chat Interface</h1>
      <div>
        <label htmlFor="prompt">Enter your prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default Message;
