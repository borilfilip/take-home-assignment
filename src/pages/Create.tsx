import { Alert, Button, Container, Form, Row } from 'react-bootstrap';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { apiUrl, BookingObject, HTTPValidationError } from '../helpers';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';

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
        <FormikProvider value={formik}>
          <h2>Start</h2>
          <Row className="mb-3">
            <Input
              name="start.city"
              value={formik.values.start.city}
              touched={formik.touched.start?.city}
              error={formik.errors.start?.city}
              label="City"
              md={5}
            />
            <Input
              name="start.street"
              value={formik.values.start.street}
              touched={formik.touched.start?.street}
              error={formik.errors.start?.street}
              label="Street"
              md={5}
            />
            <Input
              name="start.number"
              value={formik.values.start.number}
              touched={formik.touched.start?.number}
              error={formik.errors.start?.number}
              type="number"
              label="Number"
              md={2}
            />
          </Row>

          <h2>Destination</h2>
          <Row className="mb-3">
            <Input
              name="destination.city"
              value={formik.values.destination.city}
              touched={formik.touched.destination?.city}
              error={formik.errors.destination?.city}
              label="City"
              md={5}
            />
            <Input
              name="destination.street"
              value={formik.values.destination.street}
              touched={formik.touched.destination?.street}
              error={formik.errors.destination?.street}
              label="Street"
              md={5}
            />
            <Input
              name="destination.number"
              value={formik.values.destination.number}
              touched={formik.touched.destination?.number}
              error={formik.errors.destination?.number}
              type="number"
              label="Number"
              md={2}
            />
          </Row>

          <h2>Details</h2>
          <Row className="mb-3">
            <Input name="when" type="datetime-local" label="When" />
            <Input name="people" type="number" label="Number of people" />
          </Row>
          <Button type="submit">Submit</Button>
          <Link to="/" className="ms-2 btn btn-secondary">
            ⭠ Back
          </Link>
        </FormikProvider>
      </Form>
    </Container>
  );
}

export default Create;
