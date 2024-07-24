import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../hooks/useRecaptcha';
import axios from "axios"

const LoginForm = () => {
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {

    e?.preventDefault();
    if (capchaToken) {

      const result = await axios.post(`https://social-media-web-0lwr.onrender.com/api/v1/login`, {
        email: username,
        password: password,
        capchaToken,
      });

      if (result.data.recaptchaValid === false) {
        alert('ReCAPTCHA validation failed. Please try again.');
        handleRecaptcha('');
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        return;
      }

      recaptchaRef.current?.reset();

      if (result.data.success) {

        console.log('Login successful');

      } else {

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