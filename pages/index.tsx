import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Home.module.css';
import { Header } from '../src/components/Header';
import { Cover } from '../src/components/Cover';
import { Schedule } from '../src/components/Schedule';
import { Signup } from '../src/components/Signup';
import { Footer } from '../src/components/Footer';
import { useTranslation } from 'react-i18next';

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Intensive dance weekend with Ekaterina Oleynikova in Warsaw</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.coverContainer}>
          <Cover />
        </div>

        <div className={styles.contentContainer}>
          <div>
            <h1 className={styles.title}>{t('h1')}</h1>
            <h2 className={styles.subTitle}>{t('h2')}</h2>
          </div>
          <Schedule />
          <Signup />
          <Footer />
        </div>
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

export default Home;
