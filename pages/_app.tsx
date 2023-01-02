import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SDKProvider } from '@contentful/react-apps-toolkit';

export default function App({ Component, pageProps }: AppProps) {
  return <SDKProvider>
      <Component {...pageProps} />
    </SDKProvider>
}
