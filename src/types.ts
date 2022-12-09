export interface FormPopupProps {
  onClose: () => void;
}

export type Workshops = 'ws1' | 'ws2' | 'indiv';
export type Payment = 'bacs' | 'paypal' | 'stripe' | undefined;

export interface FormFields {
  name: string;
  email: string;
  ws1: boolean;
  ws2: boolean;
  indiv: boolean;
  indivHours: number;
  payment: Payment;
}

export interface OrderPayload extends FormFields {
  total: number;
}
