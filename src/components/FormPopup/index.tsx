import clsx from 'clsx';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RadioInput } from '../../ui-kit/RadioInput';
import { TextInput } from '../../ui-kit/TextInput';
import {
  defaultFields,
  indivMaxHours,
  indivMinHours,
  indivPrice,
  processingFee,
} from '../../utils/constants';
import { getWsPrice } from '../../helpers/getWsPrice';
import styles from './styles.module.css';
import { FormPopupProps, Workshops, FormFields } from '../../types';
import axios from 'axios';
import { Loader } from '../Loader';

const {
  form,
  form__title,
  form__subtitle,
  form__wsWrapper,
  form__total,
  form__submitButton,
  form__error,
  form__success,
  form__closeBtn,
  input__wrapper,
  input__wrapper_number,
  input__label,
  checkbox,
  checkbox__switch,
  checkbox__switch_selected,
  radioWrapper,
  counter__wrapper,
} = styles;

export const FormPopup: React.FC<FormPopupProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [formFields, setFormFields] = useState<FormFields>(defaultFields);
  const [formFieldsErrors, setFormFieldsErrors] = useState<Partial<FormFields>>({});
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const [isLoader, setIsLoader] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setFormFields((prev) => ({ ...prev, [name]: value }));
    setIsBtnDisabled(!form!.checkValidity());
  }, []);

  const handleNumber = (action: 'plus' | 'minus') => {
    if (
      formFields.indivHours >= indivMinHours &&
      formFields.indivHours < indivMaxHours &&
      action === 'plus'
    )
      setFormFields((prev) => ({ ...prev, ['indivHours']: prev.indivHours + 1 }));

    if (
      formFields.indivHours > indivMinHours &&
      formFields.indivHours <= indivMaxHours &&
      action === 'minus'
    )
      setFormFields((prev) => ({ ...prev, ['indivHours']: prev.indivHours - 1 }));
  };

  const handleSwitch = (ws: Workshops) =>
    setFormFields((prev) => {
      const value = !prev[ws];
      return { ...prev, [ws]: value };
    });

  const getTotal = useCallback(() => {
    const ws1Price = formFields.technique ? getWsPrice() : 0;
    const ws2Price = formFields.choreo ? getWsPrice() : 0;
    const indivTotal = formFields.indiv ? indivPrice * formFields.indivHours : 0;
    const fee = formFields.payment != 'Bank' && formFields.payment != undefined ? processingFee : 1;
    return (ws1Price + ws2Price + indivTotal) * fee;
  }, [formFields]);

  const handleSubmit = async () => {
    setSubmitError(false);
    setIsLoader(true);
    const payload = {
      ...formFields,
      total: getTotal(),
      lng: currentLang,
    };
    try {
      setIsBtnDisabled(true);
      await axios.post('/api/submit', payload).then((res) => {
        console.log(res.data);
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 5000);
      });
    } catch (error) {
      setSubmitError(true);
      setIsBtnDisabled(false);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      <form id='registration__form' noValidate className={form} onClick={handleClickClose}>
        <button type='button' className={form__closeBtn} onClick={onClose} />
        <h2 className={form__title}>{t('form.title')}</h2>
        <div className={input__wrapper}>
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

        <div className={input__wrapper}>
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

        <div className={form__wsWrapper}>
          <h3 className={form__subtitle}>{t('form.wstitle')}</h3>
          <div className={checkbox}>
            <span
              className={clsx(checkbox__switch, formFields.technique && checkbox__switch_selected)}
              onClick={() => handleSwitch('technique')}
            />
            <p className={input__label}>{t('ws1.title') + ': ' + getWsPrice() + 'PLN'}</p>
          </div>

          <div className={checkbox}>
            <span
              className={clsx(checkbox__switch, formFields.choreo && checkbox__switch_selected)}
              onClick={() => handleSwitch('choreo')}
            />
            <p className={input__label}>{t('ws2.title') + ': ' + getWsPrice() + 'PLN'}</p>
          </div>

          <div className={checkbox}>
            <span
              className={clsx(checkbox__switch, formFields.indiv && checkbox__switch_selected)}
              onClick={() => handleSwitch('indiv')}
            />
            <p className={input__label}>
              {t('indiv') + ': ' + indivPrice + 'PLN' + ' / ' + t('indivPrice')}
            </p>
          </div>

          {formFields.indiv && (
            <div className={clsx(input__wrapper, input__wrapper_number)}>
              <span className={input__label}>{t('form.indivHours')}</span>
              <div className={counter__wrapper}>
                <button
                  type='button'
                  className={styles.counter__button}
                  onClick={() => handleNumber('minus')}
                >
                  –
                </button>
                <span className={styles.counter__value}>{formFields.indivHours}</span>
                <button
                  type='button'
                  className={styles.counter__button}
                  onClick={() => handleNumber('plus')}
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>

        {getTotal() > 0 ? (
          <span className={form__total}>{t('form.total').toUpperCase() + ': ' + getTotal()}zł</span>
        ) : (
          <></>
        )}

        <fieldset className={radioWrapper}>
          <h3 className={form__subtitle}>{t('form.paymenttitle')}</h3>
          <RadioInput
            label={t('form.bacs')}
            id='Bank'
            name='payment'
            required
            value='Bank'
            checked={formFields.payment == 'Bank'}
            onChange={handleInputChange}
          />
          <RadioInput
            label={t('form.paypal')}
            id='PayPal'
            name='payment'
            required
            value='PayPal'
            checked={formFields.payment == 'PayPal'}
            onChange={handleInputChange}
          />
          <RadioInput
            label={t('form.stripe')}
            id='Card'
            name='payment'
            required
            value='Card'
            checked={formFields.payment == 'Card'}
            onChange={handleInputChange}
          />
        </fieldset>
        <button
          type='button'
          className={form__submitButton}
          disabled={isBtnDisabled}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {submitError && <span className={form__error}>{t('form.oops')}</span>}
        {success && <span className={form__success}>{t('form.success')}</span>}
      </form>
    </>
  );
};
