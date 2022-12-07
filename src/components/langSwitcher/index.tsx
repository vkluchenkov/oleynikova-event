import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

export const LangSwitcher: React.FC = () => {
  const { container, langItem, langItem_current } = styles;
  const { i18n } = useTranslation();
  const langs = ['en', 'pl', 'ru'];
  const currentLang = i18n.language;

  const switcher = langs.map((lang) => (
    <Link
      key={lang}
      href='/'
      className={clsx(langItem, currentLang === lang && langItem_current)}
      locale={lang}
    >
      {lang === 'ru' ? 'РУС' : lang.toUpperCase()}
    </Link>
  ));

  return <div className={container}>{switcher}</div>;
};
