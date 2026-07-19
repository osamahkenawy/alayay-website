import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'assets/styles/index.css';
import { CmsProvider } from '../contexts/cms';

export default function CustomApp({ Component, pageProps }) {
  const { locale } = useRouter();

  // _document.tsx only sets <html lang/dir> on the server for the initial
  // request. Client-side locale switches (the language toggle) don't re-run
  // _document, so without this the page keeps the old direction until a hard
  // refresh. Keep it in sync on every client-side locale change.
  useEffect(() => {
    const isAr = locale === 'ar';
    document.documentElement.lang = locale ?? 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <CmsProvider value={pageProps.cms}>
      <Component {...pageProps} />
    </CmsProvider>
  );
}
