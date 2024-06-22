import Cliente from "@/core/Cliente";
import { useEffect, useState } from "react";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/backend/db/ColecaoCliente";
import useTableOrForm from "../hooks/useTableOrForm";

const useClientes = () => {
  const repo: ClienteRepositorio = new ColecaoCliente();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const { formIsVisible, tableIsVisible, showTable, showForm } =
    useTableOrForm();

  const getAll = () => {
    repo.getAll().then((clientes) => {
      setClientes(clientes);
      showTable();
    });
  };

  const clienteSelecionado = (cliente: Cliente) => {
    console.log(cliente);
    setCliente(cliente);
    showForm();
  };

  const clienteExcluido = async (cliente: any) => {
    await repo.delete(cliente);
    getAll();
  };

  const saveCliente = async (cliente: Cliente) => {
    await repo.save(cliente);
    getAll();
  };

  const createNewClient = () => {
    setCliente(Cliente.vazio());
    showForm();
  };

  useEffect(() => {
    repo.getAll().then(setClientes);
  }, []);

  return {
    createNewClient,
    saveCliente,
    clienteExcluido,
    clienteSelecionado,
    cliente,
    clientes,
    tableIsVisible,
    formIsVisible,
    showTable
  };
};

export default useClientes;
