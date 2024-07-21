import { useState } from 'react';

const LoginForm = ({ token, handleToken, isRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('No');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginEvent = (event) => {
    if (event.key === 'Enter') handleLogin();
  };

  const handleLogin = () => {
    setError('No');
    let response = fetch('client/login/', {
      method: 'POST', // Specify the HTTP method
      body: JSON.stringify({ username, password }), // Your data (convert to JSON)
      headers: {
        'Content-Type': 'application/json', // Set the content type
      },
    })
      .then((response) => {
        if (!response.ok) {
          setError('Yes');
          console.log(error);
          return response.json();
        }
        return response.json();
      })
      .finally(setPassword(''));
    console.log(response);
    response.then((data) => {
      console.log(data);
      handleToken(data.token);
    });
  };

  return (
    <div>
      {!token && !isRegister ? (
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '10vh', marginRight: '2vw' }}>
              Login to Your Hotel App
            </header>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <label
                style={{ margin: '1vw', minWidth: '13vw' }}
                htmlFor="username"
              >
                User Name:
              </label>
              <input
                style={{ margin: '0.8vw' }}
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <span></span>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <label
                style={{ margin: '1vw', minWidth: '13vw' }}
                htmlFor="password"
              >
                Password:
              </label>
              <input
                style={{ margin: '1vw' }}
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'unset' }}>
              <button
                style={{
                  boxSizing: 'content-box',
                  blockSize: '5vh',
                  minWidth: '5vw',
                  height: '7vh',
                  margin: '1vw',
                  alignContent: 'baseline',
                  textSizeAdjust: 'auto',
                }}
                type="submit"
                onClick={handleLogin}
                onKeyDown={handleLoginEvent}
                name="Login"
              >
                Login
              </button>
            </div>

            {error !== undefined && error !== 'No' && (
              <span style={{ color: 'red', margin: '2vw' }}>
                User Name or Password Invalid
              </span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LoginForm;
