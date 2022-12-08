import { Col, Form } from 'react-bootstrap';
import { useFormikContext } from 'formik';
import { ChangeEventHandler } from 'react';

interface InputProps<T> {
  name: keyof T;
  value?: string | number;
  touched?: boolean;
  error?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  label: string;
  md?: number;
}

function Input<T extends { [key: string]: any }>({
  name,
  value,
  touched,
  error,
  handleChange,
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
        value={value || formik?.values[name] || ''}
        onChange={handleChange || formik?.handleChange}
        isInvalid={!!((touched || formik?.touched[name]) && (error || formik?.errors[name]))}
      />
      <Form.Control.Feedback type="invalid">
        {(error || formik?.errors[name]) as string}
      </Form.Control.Feedback>
    </Form.Group>
  );
}

export default Input;
