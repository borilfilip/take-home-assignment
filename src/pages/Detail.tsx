import { Alert, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { apiUrl, BookingObject } from '../helpers';
import { Link, useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingObject | undefined>();
  const [error, setError] = useState<AxiosError | undefined>();

  useEffect(() => {
    if (id) {
      axios
        .get(apiUrl + '/bookings/' + id)
        .then((response) => {
          setBooking(response.data);
        })
        .catch(setError);
    }
  }, [id]);
  return (
    <Container>
      <h1>Detail</h1>
      {error && <Alert variant="danger">{error.message}</Alert>}
      {booking && (
        <>
          <div className="mb-3">
            <strong>Start</strong>
            <br />
            {booking.start.street} {booking.start.number},<br />
            {booking.start.city}
          </div>
          <div className="mb-3">
            <strong>Destination</strong>
            <br />
            {booking.destination.street} {booking.destination.number},<br />
            {booking.destination.city}
          </div>
          <div className="mb-3">
            <strong>Date</strong>
            <br />
            {new Date(booking.when).toLocaleString()}
          </div>
          <div className="mb-3">
            <strong>Number of people</strong>
            <br />
            {booking.people}
          </div>
        </>
      )}
      <Link to="/" className="btn btn-success">
        ⭠ Back
      </Link>
    </Container>
  );
}

export default Detail;
