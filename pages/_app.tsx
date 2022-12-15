import '../styles/vendor/normalize.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Inter } from '@next/font/google';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const inter = Inter({ subsets: ['cyrillic', 'latin', 'latin-ext'] });

const App = ({ Component, pageProps }: AppProps) => {
  // Paypal
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;

  return (
    <PayPalScriptProvider options={{ 'client-id': paypalClientId, currency: 'PLN' }}>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </PayPalScriptProvider>
  );
};

export default appWithTranslation(App);
