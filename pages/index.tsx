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
import { useEffect, useState } from 'react';
import { FormPopup } from '../src/components/FormPopup';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { pageContainer, main, coverContainer, contentContainer, title, subTitle } = styles;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleVh = () => {
    if (typeof window != 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  handleVh();

  // useEffect(() => {
  //   if (typeof window != 'undefined') {
  //     handleVh();
  //     addEventListener('resize', handleVh);
  //     return () => removeEventListener('resize', handleVh);
  //   }
  // }, []);

  return (
    <div className={pageContainer}>
      <Head>
        <title>Intensive dance weekend with Ekaterina Oleynikova in Warsaw</title>
      </Head>
      <Header />
      <main className={main}>
        <div className={coverContainer}>
          <Cover />
        </div>

        <div className={contentContainer}>
          <div>
            <h1 className={title}>{t('h1')}</h1>
            <h2 className={subTitle}>{t('h2')}</h2>
          </div>
          <Schedule />
          <Signup onClick={openPopup} />
          <Footer />
          {isPopupOpen ? <FormPopup onClose={closePopup} /> : <></>}
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
