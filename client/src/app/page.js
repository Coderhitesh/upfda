import Home from "@/components/Home/Home";
import Head from 'next/head';

export const metadata = {
  title: ' UTTAR PRADESH FEDERATION OF DISTRIBUTOR ASSOCIATIONS',
  description: 'Welcome to  UTTAR PRADESH FEDERATION OF DISTRIBUTOR ASSOCIATIONS',
}

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
