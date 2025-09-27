import dayjs from 'dayjs';

export const formatDate = (date: string) => {
  return dayjs(date).format('ddd, DD MMMM YYYY');
};

export const formatDateShort = (date: string) => {
  return dayjs(date).format('DD MMMM YYYY');
};
