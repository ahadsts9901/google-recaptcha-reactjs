import "../App.css"
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../hooks/useRecaptcha';

const Captcha = () => {

  const [isValidCaptcha, setIsValidCaptcha] = useState(false)

  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  useEffect(() => {

    if (capchaToken) {

      recaptchaRef.current?.reset();
      setIsValidCaptcha(true)

    } else {
      setIsValidCaptcha(false)
    }

  }, [capchaToken])

  return (
    <>
      <h1>Captcha is {`${isValidCaptcha}`}</h1>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LctRBcqAAAAAAXwvJCVqk3GTWjpTbRP2wAUQgv5"
        onChange={handleRecaptcha}
      />
    </>
  );
};

export default Captcha;