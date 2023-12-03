import { differenceInDays } from 'date-fns';

export const calculateAge = (birthday: Date = new Date()) => {
  // birthday is a date
  const nowDate = new Date().getTime();
  return Math.floor((nowDate - new Date(birthday).getTime()) / 3.15576e10);
};

export const getDifferenceInDays = (endDate: string) => {
  const nowDate = new Date();
  const formattedEndDate = new Date(endDate);
  return differenceInDays(formattedEndDate, nowDate);
};
