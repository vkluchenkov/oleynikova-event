import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioInput } from '../../ui-kit/RadioInput';
import { TextInput } from '../../ui-kit/TextInput';
import { indivPrice } from '../../utils/constants';
import { getWsPrice } from '../../utils/helpers';
import styles from './styles.module.css';

interface FormPopupProps {
  onClose: () => void;
}

type Workshops = 'ws1' | 'ws2' | 'indiv';
type Payment = 'bacs' | 'paypal' | 'stripe' | undefined;

interface FormFields {
  name: string;
  email: string;
  ws1: boolean;
  ws2: boolean;
  indiv: boolean;
  indivHours: number;
  payment: Payment;
}

export const FormPopup: React.FC<FormPopupProps> = ({ onClose }) => {
  const { t } = useTranslation();

  const [formFields, setFormFields] = useState<FormFields>({
    name: '',
    email: '',
    ws1: false,
    ws2: false,
    indiv: false,
    indivHours: 1,
    payment: undefined,
  });
  const [formFieldsErrors, setFormFieldsErrors] = useState<Partial<FormFields>>({});
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  //Handling close on ESC
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  const handleClickClose = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.id == 'registration__form' && onClose();
  };

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const form: HTMLFormElement | null = document.querySelector('#registration__form');
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;
    const errMessage = target.validationMessage;

    setFormFieldsErrors((prev) => ({ ...prev, [name]: errMessage }));
    setFormFields((prev) => {
      // Limit number field value to integers only
      if (name === 'individual') {
        const integersOnly = Math.round(value as unknown as number);
        return { ...prev, [name]: integersOnly };
      } else return { ...prev, [name]: value };
    });
    setIsBtnDisabled(!form!.checkValidity());
  }, []);

  const handleSwitch = (ws: Workshops) =>
    setFormFields((prev) => {
      const value = !prev[ws];
      return { ...prev, [ws]: value };
    });

  const getTotal = useCallback(() => {
    const ws1Price = formFields.ws1 ? getWsPrice() : 0;
    const ws2Price = formFields.ws2 ? getWsPrice() : 0;
    const indivTotal = formFields.indiv ? indivPrice * formFields.indivHours : 0;
    return ws1Price + ws2Price + indivTotal;
  }, [formFields]);

  return (
    <form id='registration__form' noValidate className={styles.form} onClick={handleClickClose}>
      <h2 className={styles.title}>{t('form.title')}</h2>
      <div className={styles.inputWrapper}>
        <TextInput
          required
          min={3}
          type='text'
          name='name'
          value={formFields.name}
          placeholder={t('form.name') + '*'}
          onChange={handleInputChange}
          error={formFieldsErrors.name}
        />
      </div>

      <div className={styles.inputWrapper}>
        <TextInput
          required
          type='email'
          name='email'
          value={formFields.email}
          placeholder={t('form.email') + '*'}
          onChange={handleInputChange}
          error={formFieldsErrors.email}
        />
      </div>

      <div className={styles.wsWrapper}>
        <h3 className={styles.subtitle}>{t('form.wstitle')}</h3>
        <div className={styles.filter}>
          <span
            className={clsx(
              styles.filter__switch,
              formFields.ws1 && styles.filter__switch_selected
            )}
            onClick={() => handleSwitch('ws1')}
          />
          <p className={styles.label}>{t('ws1.title') + ': ' + getWsPrice() + 'zł'}</p>
        </div>

        <div className={styles.filter}>
          <span
            className={clsx(
              styles.filter__switch,
              formFields.ws2 && styles.filter__switch_selected
            )}
            onClick={() => handleSwitch('ws2')}
          />
          <p className={styles.label}>{t('ws2.title') + ': ' + getWsPrice() + 'zł'}</p>
        </div>

        <div className={styles.filter}>
          <span
            className={clsx(
              styles.filter__switch,
              formFields.indiv && styles.filter__switch_selected
            )}
            onClick={() => handleSwitch('indiv')}
          />
          <p className={styles.label}>
            {t('indiv') + ': ' + indivPrice + 'zł' + ' / ' + t('indivPrice')}
          </p>
        </div>

        {formFields.indiv && (
          <div className={clsx(styles.inputWrapper, styles.inputWrapperNumber)}>
            <label htmlFor='indivHours' className={styles.label}>
              {t('form.indivHours')}
            </label>
            <TextInput
              className={styles.input__hours}
              min={1}
              type='number'
              name='indivHours'
              value={formFields.indivHours}
              onChange={handleInputChange}
              error={formFieldsErrors.indivHours?.toString()}
            />
          </div>
        )}
      </div>

      {getTotal() > 0 ? (
        <span className={styles.total}>{t('form.total').toUpperCase() + ': ' + getTotal()}zł</span>
      ) : (
        <></>
      )}

      <fieldset className={styles.radioWrapper}>
        <h3 className={styles.subtitle}>{t('form.paymenttitle')}</h3>
        <RadioInput
          label={t('form.bacs')}
          id='bacs'
          name='payment'
          required
          value='bacs'
          checked={formFields.payment == 'bacs'}
          onChange={handleInputChange}
        />
        <RadioInput
          label={t('form.paypal')}
          id='paypal'
          name='payment'
          required
          value='paypal'
          checked={formFields.payment == 'paypal'}
          onChange={handleInputChange}
        />
        <RadioInput
          label={t('form.stripe')}
          id='stripe'
          name='payment'
          required
          value='stripe'
          checked={formFields.payment == 'stripe'}
          onChange={handleInputChange}
        />
      </fieldset>
      <button type='button' className={styles.button} disabled={isBtnDisabled}>
        Submit
      </button>
    </form>
  );
};
