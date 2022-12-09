import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

export const Cover: React.FC = () => {
  const { t } = useTranslation();
  const { container, coverImage, titleContainer, title, subTitle } = styles;

  return (
    <section className={container}>
      <div className={coverImage} />
      <div className={titleContainer}>
        <h1 className={title}>{t('h1')}</h1>
        <h2 className={subTitle}>{t('h2')}</h2>
      </div>
    </section>
  );
};
