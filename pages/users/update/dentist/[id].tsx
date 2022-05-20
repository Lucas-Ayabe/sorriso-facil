import {
  UpdatePage,
  getServerSidePropsFactory as gsspFactory,
} from "@modules/users";

export const getServerSideProps = gsspFactory("dentist");

export default UpdatePage;
