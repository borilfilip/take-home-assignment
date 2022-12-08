import renderer from 'react-test-renderer';
import { BookingObject } from '../helpers';
import BookingList from './BookingList';
import { mockBooking } from './BookingDetail.test';
import { BrowserRouter } from 'react-router-dom';

const mockBooking2: BookingObject = {
  id: '2',
  start: {
    city: 'Melbourne',
    street: 'City Rd.',
    number: 183
  },
  destination: {
    city: 'Melbourne',
    street: 'The Parade',
    number: 103
  },
  when: '2022-12-08T08:15:37.164Z',
  people: 2
};

const mockBookings = [mockBooking, mockBooking2];

it('renders booking list', () => {
  const component = renderer.create(
    <BrowserRouter>
      <BookingList bookings={mockBookings} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
