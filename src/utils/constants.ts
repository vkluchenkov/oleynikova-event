import { FormFields } from '../types';

export const price1 = 100;
export const price2 = 130;
export const changeDate = new Date('2023-01-01T00:00:01+01:00');
export const endDate = new Date('2023-01-16T00:00:01+01:00');
export const indivPrice = 250;
export const processingFee = 0.05;

export const indivMinHours = 1;
export const indivMaxHours = 5;

export const defaultFields: FormFields = {
  name: '',
  email: '',
  technique: false,
  choreo: false,
  indiv: false,
  indivHours: 1,
  payment: undefined,
};
