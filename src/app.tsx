import headerLogo from './assets/favicon.svg';
import sendIcon from './assets/send.svg';
import './app.css';

export function App() {
  return (
    <>
      <header className="header">
        <img src={headerLogo} alt="header-logo" className="header__logo" />
        <h1 className="header__title">WhatsApp Click to Chat</h1>
      </header>
      <main className="main">
        <div className="main__area-box area-box">
          <label htmlFor="phone-number" className="area-box__label">
            Enter phone number:
          </label>
          <div className="area-box__input-container">
            <span className="area-box__symbol">+</span>
            <input
              type="tel"
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
              name="text-message"
              rows={4}
              className="area-box__textarea"
              placeholder="Type your message here"
            />
          </div>
        </div>
        <div className="main__button-box button-box">
          <button className="button-box__button">
            <img src={sendIcon} alt="send-icon" className="button-box__button-icon" />
            Send
          </button>
        </div>
      </main>
    </>
  );
}
