import Home from "@/components/Home/Home";
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Home />
    </>
  );
}
