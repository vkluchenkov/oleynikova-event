import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../src/components/langSwitcher';
import styles from '../styles/Home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>Intensive dance weekend with Ekaterina Oleynikova in Warsaw</title>
      </Head>
      <LangSwitcher />
      <h1>{t('h1')}</h1>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  console.log(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Home;
