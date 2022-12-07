import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

export const Signup: React.FC = () => {
  const { t } = useTranslation();
  const { section_signup, signupButton } = styles;

  return (
    <section className={section_signup}>
      <button className={signupButton} type='button'>
        {t('button')}
      </button>
    </section>
  );
};
