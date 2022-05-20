import {
  UpdatePage,
  getServerSidePropsFactory as gsspFactory,
} from "@modules/users";

export const getServerSideProps = gsspFactory("administrator");

export default UpdatePage;
