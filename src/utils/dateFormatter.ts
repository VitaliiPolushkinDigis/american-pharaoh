import { format } from 'date-fns';

export const dateFormatter = (date: Date | number) => {
  return format(date, 'MMM dd, yyyy');
};
