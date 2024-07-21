import moment from 'moment';
import { useState } from 'react';

const Dashboard = ({ token }) => {
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('No');
  const [errorBooking, setErrorBooking] = useState('No');
  const [data, setData] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const [hotelObj, setHotel] = useState({
    hotel: 0,
    start_date: moment(new Date()).format('YYYY-MM-DD'),
    end_date: moment(new Date()).format('YYYY-MM-DD'),
  });

  const handleMessage = (value) => {
    setBookingMessage(value);
  };
  const handleSetBooking = (value, updatedObj) => {
    setHotel((prevObj) => {
      let updatedData = { ...prevObj, hotel: value };
      updatedObj(updatedData);
      return updatedData;
    });
  };
  const handleBooking = (x) => {
    handleSetBooking(x.id, (updatedObj) => {
      console.log(JSON.stringify(updatedObj));
      let response = fetch('/createbooking', {
        method: 'POST', // Specify the HTTP method
        body: JSON.stringify(updatedObj), // Your data (convert to JSON)
        headers: {
          'Content-Type': 'application/json', // Set the content type
          authorization: 'token ' + token,
        },
      }).then((response) => {
        if (!response.ok) {
          setErrorBooking('Yes');
          console.log(error);
          return response.json();
        } else {
          setErrorBooking('No');
        }
        return response.json();
      });
      console.log(response);
      response.then((d) => {
        console.log(d);
        if (errorBooking === 'Yes') {
          handleMessage(d.detail);
        } else handleMessage(d.message);
        if (errorBooking === 'No') setData(data.filter((i) => i.id !== x.id));
      });
    });
  };

  const handleFromDate = (event) => {
    setHotel({ ...hotelObj, start_date: event.target.value });
  };
  const handleToDate = (event) => {
    setHotel({ ...hotelObj, end_date: event.target.value });
  };

  const handleData = (data) => {
    setData(data);
  };
  const handleError = (value) => {
    setError(value);
  };
  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearch = (event) => {
    handleError('No');
    if (event.key === 'Enter') {
      setBookingMessage('');
      let response = fetch('/hotellist?name=' + searchText, {
        method: 'GET', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type
        },
      }).then((response) => {
        if (!response.ok) {
          handleError('Yes');
          console.log(error);
          return response.json();
        } else {
          handleError('No');
        }
        setData(null);
        return response.json();
      });
      console.log(response);
      response.then((data) => {
        console.log(data);
        handleData(data);
      });
      if (error === 'No') setSearchText('');
    }
  };
  return (
    <div>
      {token ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '2vh',
          }}
        >
          {bookingMessage && errorBooking === 'Yes' ? (
            <span style={{ color: 'red' }}>{bookingMessage}</span>
          ) : null}
          {bookingMessage && errorBooking === 'No' ? (
            <span style={{ color: 'green' }}>{bookingMessage}</span>
          ) : null}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label style={{ margin: '1vw', height: '2vh' }}>
              Search Hotel:
            </label>
            <input
              type="search"
              style={{ margin: '1vw', height: '5vh' }}
              onChange={handleSearchText}
              onKeyDown={handleSearch}
              value={searchText}
              name="searchText"
            ></input>
          </div>
          <div style={{ display: 'flex', margin: '1vw' }}>
            {data && data.length > 0 ? (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>location</th>
                      <th>description</th>
                      <th>Price Per Day</th>
                      <th>Price Per Day</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Book</th>
                    </tr>
                  </thead>
                  {data && data.length > 0 ? (
                    <tbody style={{ fontSize: '1vw' }}>
                      {data.map((x) => {
                        return (
                          <tr key={x.id}>
                            <td>{x.name}</td>
                            <td>{x.location}</td>
                            <td>{x.description}</td>
                            <td>{x.price_per_day}</td>
                            <td>{x.available ? 'Yes' : 'No'}</td>
                            <td>
                              <input
                                type="date"
                                name="fromDate"
                                onChange={handleFromDate}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                name="toDate"
                                onChange={handleToDate}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  fontSize: '2vh',
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  color: 'blue',
                                  width: '100%',
                                  boxSizing: 'border-box',
                                }}
                                onClick={() => {
                                  handleBooking(x);
                                }}
                              >
                                Book
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : null}
                </table>
              </div>
            ) : null}
          </div>
          <div>
            {error === 'Yes' || (data !== null && data.length === 0) ? (
              <span>No Data Found</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
