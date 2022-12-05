import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <section className={styles.container}>
        <Link href='#' className={styles.langItem} onClick={() => i18n.changeLanguage('pl')}>
          PL
        </Link>
        <Link href='#' className={styles.langItem} onClick={() => i18n.changeLanguage('en')}>
          EN
        </Link>
        <Link href='#' className={styles.langItem} onClick={() => i18n.changeLanguage('ru')}>
          РУС
        </Link>
      </section>
    </>
  );
};
