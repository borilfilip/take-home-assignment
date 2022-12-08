export const apiUrl = 'http://localhost:8000';

interface Address {
  city: string;
  street: string;
  number: number;
}

export interface BookingObject {
  id?: string;
  start: Address;
  destination: Address;
  when: string;
  people: number;
}

export interface HTTPValidationError {
  detail: { loc: string; msg: string; type: string }[];
}
