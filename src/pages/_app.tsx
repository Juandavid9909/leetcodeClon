import '@/styles/globals.css'
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>juanvarela-leetcode</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Leetcode clone to practice real software problems" />
      </Head>

      <ToastContainer />

      <Component {...pageProps} />
    </RecoilRoot>
  );
}
