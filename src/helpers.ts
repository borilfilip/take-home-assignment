export const apiUrl = 'http://localhost:8000';

export interface BookingObject {
  start: {
    city: string;
    street: string;
    number: number;
  };
  destination: {
    city: string;
    street: string;
    number: number;
  };
  when: string;
  people: number;
}

export interface HTTPValidationError {
  detail: { loc: string; msg: string; type: string }[];
}
