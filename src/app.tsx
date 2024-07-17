import { useState, useEffect, useRef } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import QRCodeStyling from 'qr-code-styling';
import headerLogo from './assets/favicon.svg';
import sendIcon from './assets/send.svg';
import './app.css';

const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  type: 'svg',
  image: headerLogo,
  dotsOptions: {
    color: '#00b142',
    type: 'rounded',
  },
  imageOptions: {
    margin: 5,
  },
});

export function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCorrectNumber, setIsCorrectNumber] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [url, setURL] = useState('');
  const ref = useRef(null);

  function handleChangePhone(event: JSX.TargetedEvent<HTMLInputElement, Event>): void {
    const value = event.currentTarget.value;
    setPhoneNumber(value);
    setIsCorrectNumber(/^\d*$/.test(value));
  }

  function handleChangeMessage(event: JSX.TargetedEvent<HTMLTextAreaElement, Event>): void {
    setMessageText(event.currentTarget.value);
  }

  useEffect(() => {
    qrCode.append(ref.current!);
  }, []);

  useEffect(() => {
    qrCode.update({ data: url });
  }, [url]);

  async function onClick() {
    if (phoneNumber && isCorrectNumber) {
      console.log(phoneNumber);
      setURL(`https://wa.me/${phoneNumber}${messageText ? `?text=${encodeURIComponent(messageText)}` : ''}`);
    }
  }

  return (
    <>
      <header className="header">
        <img src={headerLogo} alt="header-logo" className="header__logo" />
        <h1 className="header__title">WhatsApp Click to Chat</h1>
      </header>
      <main className="main">
        <div className={`main__area-box ${isCorrectNumber ? 'area-box' : 'area-box area-box_error'}`}>
          <label htmlFor="phone-number" className="area-box__label">
            Enter phone number:
          </label>
          <div className="area-box__input-container">
            <span className="area-box__symbol">+</span>
            <input
              type="tel"
              value={phoneNumber}
              onInput={handleChangePhone}
              pattern="[0-9]*"
              name="phone-number"
              id="phone-number"
              className="area-box__input"
              placeholder="1234567890"
            />
          </div>
          <div className="area-box__line">
            <hr />
          </div>
          <div className="area-box__message-area">
            <textarea
              value={messageText}
              onInput={handleChangeMessage}
              name="text-message"
              rows={4}
              className="area-box__textarea"
              placeholder="Type your message here"
            />
          </div>
        </div>
        <div className="main__button-box button-box">
          <button className="button-box__button" onClick={onClick}>
            <img src={sendIcon} alt="send-icon" className="button-box__button-icon" />
            Create Link
          </button>
        </div>
        <div className="main__qrcode-box qrcode-box">
          {url ? (
            <a href={url} target="_blank" className="qrcode-box__link" rel="noreferrer">
              Open chat in new window
            </a>
          ) : (
            ''
          )}
          <div ref={ref} className="qrcode-box__qrcode" />
        </div>
      </main>
    </>
  );
}
