"use client";
import { LayoutProps } from "../../.next/types/app/layout";
import Titulo from "./Title";
import Table from "./Table";
import Button from "./Button";
import Form from "./Form";
import useClientes from "../hooks/useClientes";

interface LayoutWithTitleProps extends LayoutProps {
  title: string;
}

const Layout = ({ title }: LayoutWithTitleProps) => {
  const {
    createNewClient,
    saveCliente,
    clienteExcluido,
    clienteSelecionado,
    cliente,
    clientes,
    tableIsVisible,
    showTable,
  } = useClientes();

  return (
    <div className="flex flex-col justify-center items-center w-2/5 text-4 bg-white text-gray-800 rounded-md px-10 py-5">
      <Titulo>{title}</Titulo>
      <div className="flex w-full justify-end">
        <Button color="blue" onClick={() => createNewClient()}>
          <span>Novo Cliente</span>
        </Button>
      </div>
      {tableIsVisible ? (
        <Table
          clientes={clientes}
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
        ></Table>
      ) : (
        <Form
          cliente={cliente}
          cancelled={() => showTable()}
          changedCliente={saveCliente}
        />
      )}
    </div>
  );
};

export default Layout;
