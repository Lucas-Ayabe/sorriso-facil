import Head from "next/head";
import type { ReactElement } from "react";
import { Layout } from "@components";
import { Counter } from "@modules/counter";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello World!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
        error illo animi est a accusantium veniam sint eum nihil eveniet iure,
        sed quas dolores distinctio laboriosam modi sequi? Iure, animi?
      </p>

      <Counter />
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
export default Home;
