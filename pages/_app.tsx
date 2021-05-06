import type { AppProps } from 'next/app';
import 'styles/fonts.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp;
