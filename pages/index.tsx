import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from '../src/components/langSwitcher';
import styles from '../styles/Home.module.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';

const Home: NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation('common');
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Intensive dance weekend with Ekaterina Oleynikova in Warsaw</title>
      </Head>

      <header className={styles.header}>
        <LangSwitcher />
        <div className={styles.logoWrapper}>
          <Link href='https://aliah.dance' target='_blank'>
            <Image src='/images/aliah_logo.svg' fill alt='Aliah team logo' />
          </Link>
        </div>
        <span className={styles.logo_sub}>presents</span>
      </header>

      <main className={styles.main}>
        <section className={styles.section__cover}>
          <div className={styles.coverImage} />
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{t('h1')}</h1>
            <h2 className={styles.subTitle}>{t('h2')}</h2>
          </div>
        </section>

        <section className={styles.section_schedule}>
          <div className={styles.day}>
            <h3 className={styles.day__title}>15.01.2023</h3>
            <div className={styles.day__wrapper}>
              <div className={styles.day__event}>
                <p className={styles.event__text + ' ' + styles.event__time}>{t('ws1.time')}</p>
                <p className={styles.event__text + ' ' + styles.event__title}>{t('ws1.title')}</p>
                <p className={styles.event__text + ' ' + styles.event__level}>({t('ws1.level')})</p>
                <div className={styles.event__price}>
                  <p className={styles.price__content}>
                    {t('until')} {t('priceDate')} –
                    <span className={styles.price__value}> {t('wsPrice1')}</span>
                  </p>
                  <p className={styles.price__content}>
                    {t('after')} {t('priceDate')} –
                    <span className={styles.price__value}> {t('wsPrice2')}</span>
                  </p>
                </div>
              </div>

              <div className={styles.day__event}>
                <p className={styles.event__text + ' ' + styles.event__time}>{t('ws2.time')}</p>
                <p className={styles.event__text + ' ' + styles.event__title}>{t('ws2.title')}</p>
                <p className={styles.event__text + ' ' + styles.event__level}>({t('ws2.level')})</p>
                <div className={styles.event__price}>
                  <p className={styles.price__content}>
                    {t('until')} {t('priceDate')} –
                    <span className={styles.price__value}> {t('wsPrice1')}</span>
                  </p>
                  <p className={styles.price__content}>
                    {t('after')} {t('priceDate')} –
                    <span className={styles.price__value}> {t('wsPrice2')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.day}>
            <h3 className={styles.day__title}>14–17.01.2023</h3>
            <div className={styles.day__wrapper}>
              <div className={styles.day__event}>
                <p className={styles.event__text + ' ' + styles.event__title}>{t('indiv')}</p>
                <div className={styles.event__price}>
                  <p className={styles.price__content}>
                    <span className={styles.price__value}> {t('indivPrice')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
