import Head from "next/head";
import { ReactElement, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CgChevronDown, CgTrash, CgTrashEmpty } from "react-icons/cg";
import { Dashboard } from "@components";

const Create = () => {
  return (
    <>
      <Head>
        <title>Criar</title>
        <meta
          name="description"
          content="Sistema de gerenciamento de clínicas odontológicas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flow">
        <h1>Criar Usuário</h1>

        <Menu as="div" className="dropdown">
          <div>
            <Menu.Button className="button">
              Options
              <CgChevronDown className="arrow" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="enter"
            enterFrom="enter-from"
            enterTo="enter-to"
            leave="enter-leave"
            leaveFrom="leave-from"
            leaveTo="leave-to"
          >
            <Menu.Items className="content">
              <div className="divider">
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${active ? "active" : ""} item`}>
                      <span className="icon">
                        {active ? (
                          <CgTrash
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <CgTrashEmpty
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text">Mostrar detalhes</span>
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="divider">
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${active ? "active" : ""} item`}>
                      <span className="icon">
                        {active ? (
                          <CgTrash
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <CgTrashEmpty
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text">Editar</span>
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="divider">
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${active ? "active" : ""} item`}>
                      <span className="icon">
                        {active ? (
                          <CgTrash
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <CgTrashEmpty
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text">Excluir</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

Create.getLayout = (page: ReactElement) => <Dashboard>{page}</Dashboard>;
export default Create;
