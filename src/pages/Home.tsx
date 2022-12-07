import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <Container fluid={false}>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/list">Bookings</Link>
        </li>
        <li>
          <Link to="/create">New booking</Link>
        </li>
      </ul>
    </Container>
  );
}

export default Home;
