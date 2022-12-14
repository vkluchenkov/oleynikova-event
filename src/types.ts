export interface FormPopupProps {
  onClose: () => void;
}

export type Workshops = 'technique' | 'choreo' | 'indiv';
export type Payment = 'Bank' | 'PayPal' | 'Card' | undefined;

export interface FormFields {
  name: string;
  email: string;
  technique: boolean;
  choreo: boolean;
  indiv: boolean;
  indivHours: number;
  payment: Payment;
}

export interface OrderPayload extends FormFields {
  total: {
    total: number;
    fee: number;
    grandTotal: number;
  };
  lng: string;
}
