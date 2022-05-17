import { ReactElement } from "react";
import { Dashboard } from "@modules/ui";

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
};

const Home = () => {
  return <span>Carregando...</span>;
};

Home.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Home;
