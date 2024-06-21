"use client";

import Cliente from "@/core/Cliente";
import { EditIcon, TrashIcon } from "@/components/Icons";

interface TableProps {
  clientes: Cliente[];
  clienteSelecionado?: (cliente: Cliente) => void;
  clienteExcluido?: (cliente: Cliente) => void;
}

const Table = (props: TableProps) => {
  const showActions = props.clienteExcluido || props.clienteSelecionado;

  const tableHeader = (
    <tr>
      <th className="text-center p-4">Código</th>
      <th className="text-center p-4">Nome</th>
      <th className="text-center p-4">Idade</th>
      {showActions && <th className="text-center p-4">Ações</th>}
    </tr>
  );

  const actions = (cliente: Cliente) => {
    return (
      <td className="flex justify-center">
        {props.clienteSelecionado && (
          <button
            onClick={() => {
              props.clienteSelecionado?.(cliente);
            }}
            className="flex justify-center items-center text-green-600 rounded-full hover:bg-purple-50 cursor-pointer p-2 m-1"
          >
            <EditIcon />
          </button>
        )}
        {props.clienteExcluido && (
          <button
            onClick={() => {
              props.clienteExcluido?.(cliente);
            }}
            className="flex justify-center items-center text-red-600 rounded-full hover:bg-purple-50 cursor-pointer p-2 m-1"
          >
            <TrashIcon />
          </button>
        )}
      </td>
    );
  };

  const tableBody = () => {
    return props?.clientes?.map((cliente, i) => {
      return (
        <tr
          key={cliente.id}
          className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
        >
          <td className="text-center p-4">{cliente.id}</td>
          <td className="text-center p-4">{cliente.nome}</td>
          <td className="text-center p-4">{cliente.idade}</td>
          {showActions && actions(cliente)}
        </tr>
      );
    });
  };

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead
        className={`bg-gradient-to-r from-purple-500 to-purple-800 text-gray-100`}
      >
        {tableHeader}
      </thead>
      <tbody>{tableBody()}</tbody>
    </table>
  );
};

export default Table;
