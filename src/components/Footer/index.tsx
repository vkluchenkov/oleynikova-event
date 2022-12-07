import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { footer, address, copyright } = styles;

  return (
    <footer className={footer}>
      <p className={address}>
        <Link href={'https://goo.gl/maps/2U9q6t9pxeddvdBs7'} target='_blank' rel='nofollow'>
          {t('address')}: Atlas Tower, al. Jerozolimskie 123, 00&#8209;001 Warsaw
        </Link>
      </p>
      <p className={copyright}>©2022 Aliah dance team. Created by Vladimir Kluchenkov</p>
    </footer>
  );
};
