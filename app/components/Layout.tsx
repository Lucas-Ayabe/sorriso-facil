import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <h1>Sorriso Fácil</h1>
      {children}
    </div>
  );
};
