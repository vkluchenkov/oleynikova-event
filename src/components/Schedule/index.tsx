import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { indivPrice, price1, price2 } from '../../utils/constants';
import styles from './styles.module.css';

export const Schedule: React.FC = () => {
  const { t } = useTranslation();
  const {
    section_schedule,
    day,
    day__title,
    day__wrapper,
    day__event,
    day__event_indiv,
    event__text,
    event__time,
    event__title,
    event__level,
    event__price,
    price__content,
    price__value,
    event__title_indiv,
  } = styles;

  return (
    <section className={clsx(section_schedule)}>
      <div className={day}>
        <h3 className={day__title}>15.01.2023</h3>
        <div className={day__wrapper}>
          <div className={day__event}>
            <p className={clsx(event__text, event__time)}>{t('ws1.time')}</p>
            <p className={clsx(event__text, event__title)}>{t('ws1.title')}</p>
            <p className={clsx(event__text, event__level)}>({t('ws1.level')})</p>
            <div className={event__price}>
              <p className={price__content}>
                {t('until')} {t('priceDate')} –<span className={price__value}> {price1}PLN</span>
              </p>
              <p className={price__content}>
                {t('after')} {t('priceDate')} –<span className={price__value}> {price2}PLN</span>
              </p>
            </div>
          </div>

          <div className={day__event}>
            <p className={clsx(event__text, event__time)}>{t('ws2.time')}</p>
            <p className={clsx(event__text, event__title)}>{t('ws2.title')}</p>
            <p className={clsx(event__text, event__level)}>({t('ws2.level')})</p>
            <div className={event__price}>
              <p className={price__content}>
                {t('until')} {t('priceDate')} –<span className={price__value}> {price1}PLN</span>
              </p>
              <p className={price__content}>
                {t('after')} {t('priceDate')} –<span className={price__value}> {price2}PLN</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={day}>
        <h3 className={day__title}>14–17.01.2023</h3>
        <div className={day__wrapper}>
          <div className={clsx(day__event, day__event_indiv)}>
            <p className={clsx(event__text, event__title_indiv)}>{t('indiv')}</p>
            <div className={event__price}>
              <p className={price__content}>
                <span className={price__value}> {indivPrice + 'PLN / ' + t('indivPrice')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
