import Image from 'next/image';
import Link from 'next/link';
import { LangSwitcher } from '../LangSwitcher';
import styles from './styles.module.css';

export const Header: React.FC = () => {
  const { header, logoWrapper, logo_sub, logoGroupWrapper, langSwitcherWrapper } = styles;

  return (
    <header className={header}>
      <div className={logoGroupWrapper}>
        <div className={logoWrapper}>
          <Link href='https://aliah.dance' target='_blank'>
            <Image src='/images/aliah_logo.svg' fill alt='Aliah team logo' />
          </Link>
        </div>
        <span className={logo_sub}>presents</span>
      </div>
      <div className={langSwitcherWrapper}>
        <LangSwitcher />
      </div>
    </header>
  );
};
