import { Col, Form } from 'react-bootstrap';
import { useFormikContext } from 'formik';

interface InputProps<T> {
  name: keyof T;
  value?: string | number;
  touched?: boolean;
  error?: string;
  type?: string;
  label: string;
  md?: number;
}

function Input<T extends { [key: string]: any }>({
  name,
  value,
  touched,
  error,
  type,
  label,
  md
}: InputProps<T>) {
  const formik = useFormikContext<T>();

  return (
    <Form.Group as={Col} md={md}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name as string}
        value={value || formik.values[name]}
        onChange={formik.handleChange}
        isInvalid={!!((touched || formik.touched[name]) && (error || formik.errors[name]))}
      />
      <Form.Control.Feedback type="invalid">
        {(error || formik.errors[name]) as string}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default Input;
