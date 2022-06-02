import { withSessionRoute } from "@modules/auth";
import { Maybe } from "purify-ts";

export const getServerSideProps = withSessionRoute(async ({ req }) => {
  return {
    redirect: {
      destination: Maybe.fromNullable(req.session.user).caseOf({
        Just: (user) => {
          return user.admin ?? false ? "/users" : "/services";
        },
        Nothing: () => {
          return "/login";
        },
      }),
      permanent: false,
    },
  };
});

const Home = () => {
  return <></>;
};

export default Home;
