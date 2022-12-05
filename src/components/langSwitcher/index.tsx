import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      <div className={styles.container}>
        <Link
          href='/'
          className={clsx(styles.langItem, currentLang === 'pl' && styles.langItem_current)}
          locale='pl'
        >
          PL
        </Link>
        <Link
          href='/'
          className={clsx(styles.langItem, currentLang === 'en' && styles.langItem_current)}
          locale='en'
        >
          EN
        </Link>
        <Link
          href='/'
          className={clsx(styles.langItem, currentLang === 'ru' && styles.langItem_current)}
          locale='ru'
        >
          РУС
        </Link>
      </div>
    </>
  );
};
