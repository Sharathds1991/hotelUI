import { useEffect, useState } from 'react';

const BookingList = ({ token }) => {
  const [bookingList, setBookingList] = useState(null);
  const [error, setError] = useState('No');
  const loadBookings = () => {
    let response = fetch('/bookinglist', {
      method: 'GET', // Specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Set the content type
        authorization: 'token ' + token,
      },
    }).then((response) => {
      if (!response.ok) {
        setError('Yes');
        console.log(error);
        return response.json();
      } else {
        setError('No');
      }
      setBookingList(null);
      return response.json();
    });
    console.log(response);
    response.then((data) => {
      console.log(data);
      if (error === 'No') setBookingList(data);
    });
  };

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div>
      {token ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '2vh',
            alignContent: 'center',
          }}
        >
          <header style={{ margin: '2vh' }}>Booking History</header>
          {bookingList && bookingList.length > 0 ? (
            <div style={{ display: 'flex', alignContent: 'center' }}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Duration in Days</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingList.map((x) => {
                    return (
                      <tr key={x.id}>
                        <td>{x.hotel}</td>
                        <td>{x.cost}</td>
                        <td>{x.days}</td>
                        <td>{x.start_date}</td>
                        <td>{x.end_date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
          {error === 'Yes' ? (
            <span>Booking List could not Obtained</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default BookingList;
