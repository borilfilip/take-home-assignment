import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { apiUrl, BookingObject, HTTPValidationError } from '../helpers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();
  const [error, setError] = useState<AxiosError<HTTPValidationError> | undefined>();

  const onSubmit = async (form: BookingObject) => {
    try {
      await axios.post(apiUrl + '/bookings', { ...form, when: new Date(form.when) });
      setError(undefined);
      navigate('/');
    } catch (error) {
      setError(error as unknown as AxiosError<HTTPValidationError>); // Will always be AxiosError
    }
  };

  const validationSchema = Yup.object().shape({
    start: Yup.object().shape({
      city: Yup.string().required('Enter city'),
      street: Yup.string().required('Enter street'),
      number: Yup.number().min(1, 'Invalid street number').required('Enter street number')
    }),
    destination: Yup.object().shape({
      city: Yup.string().required('Enter city'),
      street: Yup.string().required('Enter street'),
      number: Yup.number().min(1, 'Invalid street number').required('Enter street number')
    }),
    when: Yup.string().required('Enter date of booking'),
    people: Yup.number().min(1, 'Minimum number of people is 1').required('Enter number of people')
  });

  const formik = useFormik<BookingObject>({
    initialValues: {
      start: {
        city: '',
        street: '',
        number: 0
      },
      destination: {
        city: '',
        street: '',
        number: 0
      },
      when: '',
      people: 1
    },
    onSubmit,
    validationSchema
  });

  return (
    <Container>
      <h1>New booking</h1>
      {error && (
        <Alert variant="danger">
          {error.response ? (
            <ul>
              {error.response.data.detail.map((e, index) => (
                <li key={index}>
                  {e.loc} – {e.msg}
                </li>
              ))}
            </ul>
          ) : (
            error.message
          )}
        </Alert>
      )}

      <Form onSubmit={formik.handleSubmit}>
        <h2>Start</h2>
        <Row className="mb-3">
          <Form.Group as={Col} md={5}>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="start.city"
              value={formik.values.start.city}
              onChange={formik.handleChange}
              isInvalid={!!formik.touched.start?.city && !!formik.errors.start?.city}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.start?.city}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={5}>
            <Form.Label>Street</Form.Label>
            <Form.Control
              name="start.street"
              value={formik.values.start.street}
              onChange={formik.handleChange}
              isInvalid={!!formik.touched.start?.street && !!formik.errors.start?.street}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.start?.street}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={2}>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              name="start.number"
              value={formik.values.start.number}
              onChange={formik.handleChange}
              isInvalid={!!formik.touched.start?.number && !!formik.errors.start?.number}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.start?.number}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <h2>Destination</h2>
        <Row className="mb-3">
          <Form.Group as={Col} md={5}>
            <Form.Label>City</Form.Label>
            <Form.Control
              name="destination.city"
              value={formik.values.destination.city}
              onChange={formik.handleChange}
              isInvalid={!!formik.touched.destination?.city && !!formik.errors.destination?.city}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.destination?.city}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={5}>
            <Form.Label>Street</Form.Label>
            <Form.Control
              name="destination.street"
              value={formik.values.destination.street}
              onChange={formik.handleChange}
              isInvalid={
                !!formik.touched.destination?.street && !!formik.errors.destination?.street
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.destination?.street}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={2}>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              name="destination.number"
              value={formik.values.destination.number}
              onChange={formik.handleChange}
              isInvalid={
                !!formik.touched.destination?.number && !!formik.errors.destination?.number
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.destination?.number}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <h2>Details</h2>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>When</Form.Label>
            <Form.Control
              type="datetime-local"
              name="when"
              value={formik.values.when}
              onChange={formik.handleChange}
              isInvalid={!!formik.touched.when && !!formik.errors.when}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.when}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>People</Form.Label>
            <Form.Control
              type="number"
              name="people"
              value={formik.values.people}
              onChange={formik.handleChange}
              isInvalid={!!formik.touched.people && !!formik.errors.people}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.people}</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default Create;
