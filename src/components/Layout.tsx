"use client";
import Cliente from "@/core/Cliente";
import { LayoutProps } from "../../.next/types/app/layout";
import Titulo from "./Title";
import Table from "./Table";
import Button from "./Button";
import { useState } from "react";
import Form from "./Form";

interface LayoutWithTitleProps extends LayoutProps {
  title: string;
}

const Layout = ({ title }: LayoutWithTitleProps) => {
  const clientes = [
    new Cliente("Ana", 40, "1"),
    new Cliente("Ana2", 40, "1"),
    new Cliente("Ana3", 40, "1"),
    new Cliente("Ana4", 40, "1"),
  ];

  const clienteSelecionado = (cliente: Cliente) => {
    console.log(cliente);
    setCliente(cliente);
    setVisible("form");
  };

  const clienteExcluido = (cliente: any) => {
    console.log(cliente);
  };

  const saveCliente = (cliente: Cliente) => {
    console.log(cliente);
    setVisible("table");
    clientes.push(cliente);
  };

  const createNewClient = () => {
    setCliente(Cliente.vazio());
    setVisible("form");
  };

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [visible, setVisible] = useState<"table" | "form">("table");
  return (
    <div className="flex flex-col justify-center items-center w-2/5 text-4 bg-white text-gray-800 rounded-md px-10 py-5">
      <Titulo>{title}</Titulo>
      <div className="flex w-full justify-end">
        <Button color="blue" onClick={() => createNewClient()}>
          <span>Novo Cliente</span>
        </Button>
      </div>
      {visible === "table" ? (
        <Table
          clientes={clientes}
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
        ></Table>
      ) : (
        <Form
          cliente={cliente}
          cancelled={() => setVisible("table")}
          changedCliente={saveCliente}
        />
      )}
    </div>
  );
};

export default Layout;
