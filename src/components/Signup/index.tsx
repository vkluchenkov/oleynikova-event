import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

interface SignupProps {
  onClick: () => void;
}

export const Signup: React.FC<SignupProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const { section_signup, signupButton } = styles;

  return (
    <section className={section_signup}>
      <button className={signupButton} type='button' onClick={onClick}>
        {t('button')}
      </button>
    </section>
  );
};
