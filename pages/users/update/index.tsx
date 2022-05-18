import React from "react";

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/users",
      permanent: false,
    },
  };
};

const Update = () => {
  return <></>;
};

export default Update;
