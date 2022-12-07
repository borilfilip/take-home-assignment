import { Alert, Container, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { apiUrl, BookingObject } from '../helpers';
import { Link } from 'react-router-dom';

function List() {
  const [bookings, setBookings] = useState<{ [key: number]: BookingObject }>({});
  const [error, setError] = useState<AxiosError | undefined>();

  useEffect(() => {
    axios
      .get(apiUrl + '/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch(setError);
  }, []);

  return (
    <Container>
      <h1>Bookings</h1>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {Object.values(bookings).length && (
        <Table striped hover>
          <thead>
            <tr>
              <th colSpan={3}>Start</th>
              <th colSpan={3}>Destination</th>
              <th>When</th>
              <th>People</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(bookings).map(([id, booking]) => (
              <tr key={id}>
                <td>{booking.start.city}</td>
                <td>{booking.start.street}</td>
                <td>{booking.start.number}</td>
                <td>{booking.destination.city}</td>
                <td>{booking.destination.street}</td>
                <td>{booking.destination.number}</td>
                <td>{new Date(booking.when).toLocaleString()}</td>
                <td>{booking.people}</td>
                <td>
                  <Link to={'/detail/' + id} className="btn btn-sm btn-primary">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default List;
