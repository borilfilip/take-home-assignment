import { Alert, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { apiUrl, BookingObject } from '../helpers';
import { Link } from 'react-router-dom';
import BookingList from '../components/BookingList';

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
      <BookingList bookings={Object.values(bookings)} />
      <Link to="/" className="btn btn-success mb-3">
        ⭠ Back
      </Link>
    </Container>
  );
}

export default List;
