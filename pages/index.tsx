import Head from "next/head";
import { ReactElement } from "react";
import { Dashboard } from "@modules/ui/components";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

Home.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Home;
