import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import styles from '../styles/ThankYou.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ThankYou: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { pageContainer, main, header, subHeader } = styles;

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  });

  return (
    <div className={pageContainer}>
      <Head>
        <title>Intensive dance weekend with Ekaterina Oleynikova in Warsaw</title>
      </Head>
      <main className={main}>
        <h1 className={header}>{t('thankYou.title')}</h1>
        <h2 className={subHeader}>{t('thankYou.subtitle')}</h2>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default ThankYou;
