import Input from './Input';
import { act, fireEvent, render } from '@testing-library/react';
import { Formik } from 'formik';

it('updates state', () => {
  const component = render(
    <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
      <Input name="test" label="Test" />
    </Formik>
  );
  const input: HTMLInputElement | null = component.container.querySelector(`input[name="test"]`);
  if (!input) {
    throw Error('No input found');
  }
  expect(input.value).toBe('');
  act(() => {
    fireEvent.change(input, { target: { value: 'hello' } });
  });
  expect(input.value).toBe('hello');
});
