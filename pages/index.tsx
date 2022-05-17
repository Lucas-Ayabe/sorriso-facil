export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/login",
      permanent: true,
    },
  };
};

const Home = () => {
  return <></>;
};

export default Home;
