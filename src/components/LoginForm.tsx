import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from './useRecaptcha';

const LoginForm = () => {
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (capchaToken && username && password) {
      // Send login request with captcha token, username, and password
      const result = await axios.post(`https://your-login-endpoint`, {
        username,
        password,
        capchaToken,
      });

      // Check if the reCAPTCHA validation failed on the server-side
      if (result.data.recaptchaValid === false) {
        alert('ReCAPTCHA validation failed. Please try again.');
        handleRecaptcha('');
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        return;
      }

      // Reset captcha after submission
      recaptchaRef.current?.reset();

      // If the login is successful, perform post-login logic
      if (result.data.success) {
        // Example post-login logic:
        // - Store user token or session data
        // - Redirect to a protected page
        // - Update user state in the application
        console.log('Login successful');
        // ...
      } else {
        // If the login fails, display an error message to the user
        alert('Login failed. Please check your credentials and try again.');
      }
    } else {
      alert('Please fill in all fields and complete the captcha.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>
      <br />
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="Your client site key"
        onChange={handleRecaptcha}
      />
      <br />
      <button disabled={!capchaToken} type="submit">Login</button>
    </form>
  );
};

export default LoginForm;