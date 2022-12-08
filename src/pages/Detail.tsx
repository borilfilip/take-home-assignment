import { Alert, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { apiUrl, BookingObject } from '../helpers';
import { Link, useParams } from 'react-router-dom';
import BookingDetail from '../components/BookingDetail';

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
      <BookingDetail booking={booking} />
      <Link to="/list" className="btn btn-success">
        ⭠ Back
      </Link>
    </Container>
  );
}

export default Detail;
