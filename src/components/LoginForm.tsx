import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../hooks/useRecaptcha';

const LoginForm = () => {
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: any) => {

    e?.preventDefault();
    if (capchaToken) {

      alert("captcha successfull")

      recaptchaRef.current?.reset();

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
        sitekey="6LctRBcqAAAAAAXwvJCVqk3GTWjpTbRP2wAUQgv5"
        onChange={handleRecaptcha}
      />
      <br />
      <button disabled={!capchaToken} type="submit">Login</button>
    </form>
  );
};

export default LoginForm;