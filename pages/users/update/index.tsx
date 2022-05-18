import React from "react";

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/users",
      permanent: false,
    },
  };
};

export const Update = () => {
  return <></>;
};
