import { BookingObject } from '../helpers';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface BookingListProps {
  bookings?: BookingObject[];
}

function BookingList({ bookings }: BookingListProps) {
  return (
    (bookings?.length && (
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
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.start.city}</td>
              <td>{booking.start.street}</td>
              <td>{booking.start.number}</td>
              <td>{booking.destination.city}</td>
              <td>{booking.destination.street}</td>
              <td>{booking.destination.number}</td>
              <td>{new Date(booking.when).toLocaleString()}</td>
              <td>{booking.people}</td>
              <td>
                <Link to={'/detail/' + booking.id} className="btn btn-sm btn-primary">
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )) ||
    null
  );
}

export default BookingList;
