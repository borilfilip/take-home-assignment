import { BookingObject } from '../helpers';

interface BookingDetailProps {
  booking?: BookingObject;
}

function BookingDetail({ booking }: BookingDetailProps) {
  return (
    (booking && (
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
    )) ||
    null
  );
}

export default BookingDetail;
