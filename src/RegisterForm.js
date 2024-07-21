import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';

const RegisterForm = ({ isRegister, handleRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [error, setError] = useState('No');
  const [message, setMessage] = useState('');

  const handleUser = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConPassword = (event) => {
    setConfirm_password(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleMessage = (message) => {
    setMessage(message);
  };

  const handleRegisterButton = () => {
    let response = fetch('client/registration/', {
      method: 'POST', // Specify the HTTP method
      body: JSON.stringify({ username, email, password, confirm_password }), // Your data (convert to JSON)
      headers: {
        'Content-Type': 'application/json', // Set the content type
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError('Yes');
          console.log(error);
          return response.json();
        } else {
          setError('No');
        }
        return response.json();
      })
      .finally(setPassword(''));
    console.log(response);
    response.then((data) => {
      console.log(data);
      handleMessage(data.message);
    });
    if (error !== 'Yes') handleRegister(false);
  };

  return (
    <div>
      {isRegister ? (
        <div
          style={{
            borderStyle: 'groove',
            borderColor: 'ActiveBorder',
            backgroundColor: 'MenuText',
            paddingInline: '2vw',
            marginBlockEnd: '2vw',
            borderRadius: '1vw',
            height: '70vh',
            alignContent: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label
              style={{ margin: '1vw', minWidth: '18vw' }}
              htmlFor="username"
            >
              username:
            </label>
            <input
              style={{ margin: '0.6vw' }}
              type="username"
              name="username"
              value={username}
              onChange={handleUser}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label
              style={{ margin: '1vw', minWidth: '18vw' }}
              htmlFor="password"
            >
              Password:
            </label>
            <input
              style={{ margin: '0.6vw' }}
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label
              style={{ margin: '1vw', minWidth: '18vw' }}
              htmlFor="confirm_password"
            >
              confirm password:
            </label>
            <input
              style={{ margin: '0.6vw' }}
              type="confirm_password"
              name="confirm_password"
              value={confirm_password}
              onChange={handleConPassword}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label style={{ margin: '1vw', minWidth: '18vw' }} htmlFor="email">
              Email:
            </label>

            <input
              style={{ margin: '0.6vw' }}
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'unset' }}>
            <button
              style={{
                boxSizing: 'border-box',
                wordSpacing: '1vw',
                blockSize: '5vh',
                margin: '1vw',
                minWidth: '4vw',
              }}
              type="submit"
              onClick={handleRegisterButton}
              name="Register"
            >
              Register
            </button>
          </div>
          {error && <span style={{ color: 'red' }}>{message}</span>}
        </div>
      ) : null}
    </div>
  );
};

export default RegisterForm;
