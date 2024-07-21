import { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import HotelManagement from './HotelManagement';

function App() {
  const [token, setToken] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleToken = (token) => {
    setToken(token);
  };

  const handleRegister = () => {
    setIsRegister(!isRegister);
  };
  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <div
            style={{
              display: 'unset',
              marginLeft: '20vw',
            }}
          >
            {' '}
            <label htmlFor="isRegister">Register</label>
            <input
              type="checkbox"
              name="isRegister"
              onChange={handleRegister}
              checked={isRegister}
              value={isRegister}
            ></input>
          </div>
        ) : null}

        <LoginForm
          token={token}
          handleToken={handleToken}
          isRegister={isRegister}
        ></LoginForm>
        <RegisterForm
          isRegister={isRegister}
          handleRegister={handleRegister}
        ></RegisterForm>
        <HotelManagement token={token} handleToken={handleToken}></HotelManagement>
      </header>
    </div>
  );
}

export default App;
