import { useState } from 'react';
import Dashboard from './Dashboard';
import BookingList from './BookingList';

const HotelManagement = ({ token, handleToken }) => {
  const [showComponent, setShowComponent] = useState('Dashboard');

  const handleShow = (value) => {
    if (value) {
      setShowComponent(value);
    }
  };

  const loadComponent = () => {
    if (showComponent === 'Dashboard') {
      return <Dashboard token={token}></Dashboard>;
    } else if (showComponent === 'History') {
      return <BookingList token={token}></BookingList>;
    }
  };

  return (
    <div>
      {token ? (
        <div
          style={{
            borderStyle: 'groove',
            borderColor: 'ActiveBorder',
            backgroundColor: 'MenuText',
            paddingInline: '2vw',
            marginBlockEnd: '2vw',
            borderRadius: '1vw',
            minHeight: '100vh',
            minWidth: '80vw',
            alignContent: 'baseline',
            flexGrow: 'inherit',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '0.1vw',
              maxWidth: '80vw',
              alignContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                Width: '20vw',
                borderRightStyle: 'groove',
                borderColor: 'ActiveBorder',
                backgroundColor: 'MenuText',
                minHeight: '100vh',
                fontSize: '4vmin',
                flexWrap: 'wrap',
                alignContent: 'center',
              }}
            >
              <button
                onClick={() => {
                  handleShow('Dashboard');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  marginTop: '3vh',
                  marginBottom: '1vh',
                  fontSize: '2vh',
                  Width: '10vw',
                  padding: 0,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'blue',
                }}
              >
                Dashboard
              </button>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  marginBottom: '1vh',
                  fontSize: '2vh',
                  minWidth: '10vw',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'blue',
                }}
                onClick={() => {
                  handleShow('History');
                }}
              >
                Booking History
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <button
                type="submit"
                style={{
                  background: 'none',
                  border: 'none',
                  height: '5vh',
                  alignSelf: 'end',
                  display: 'flex',
                  marginRight: '3vw',
                  fontSize: '3vmin',
                  position: 'absolute',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'brown',
                }}
                onClick={() => {
                  handleToken('');
                }}
              >
                Logout
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderColor: 'ActiveBorder',
                backgroundColor: 'MenuText',
                minHeight: '100vh',
                maxWidth: '60vw',
                fontSize: '4vmin',
                flexWrap: 'inherit',
                alignContent: 'center',
              }}
            >
              {loadComponent()}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HotelManagement;
