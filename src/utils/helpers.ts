import { changeDate, price1, price2 } from './constants';

export const getWsPrice = () => {
  const today = new Date();
  if (changeDate > today) return price1;
  else return price2;
};
