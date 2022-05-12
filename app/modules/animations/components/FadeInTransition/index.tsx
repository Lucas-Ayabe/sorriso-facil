import { Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren } from "react";

export const FadeInTranstion = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Transition
      as={Fragment}
      enter="fade-in-transition"
      enterFrom="fade-in-from"
      enterTo="fade-in-to"
      leave="fade-in-transition"
      leaveFrom="fade-in-to"
      leaveTo="fade-in-from"
    >
      {children}
    </Transition>
  );
};
