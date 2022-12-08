import renderer from 'react-test-renderer';
import { BookingObject } from '../helpers';
import BookingDetail from './BookingDetail';

export const mockBooking: BookingObject = {
  id: '1',
  start: {
    city: 'Warszaw',
    street: 'Marszałkowska',
    number: 1
  },
  destination: {
    city: 'Praha',
    street: 'Staroměstské nám.',
    number: 4
  },
  when: '2022-12-08T08:15:37.164Z',
  people: 2
};

it('renders booking detail', () => {
  const component = renderer.create(<BookingDetail booking={mockBooking} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
