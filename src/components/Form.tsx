import Cliente from "@/core/Cliente";
import Input from "./Input";
import { useState } from "react";
import Button from "./Button";

interface FormProps {
  cliente?: Cliente;
  changedCliente?: (cliente: Cliente) => void;
  cancelled?: () => void;
}

const Form = (props: FormProps) => {
  const id = props.cliente?.id;
  const [nome, setNome] = useState<string>(props.cliente?.nome ?? "");
  const [idade, setIdade] = useState<number>(props.cliente?.idade ?? 0);
  return (
    <div className="flex flex-col w-full">
      {id && <Input text={"Código"} value={id} readOnly={true} />}
      <Input
        text={"Nome"}
        value={nome}
        readOnly={false}
        changedValue={setNome}
        className="mb-4"
      />
      <Input
        text={"Idade"}
        value={idade}
        readOnly={false}
        changedValue={setIdade}
        className="mb-4"
      />
      <div className="flex mt-3 gap-2">
        <Button
          color="blue"
          onClick={() =>
            props.changedCliente?.(
              new Cliente(nome as string, idade as number, id as string)
            )
          }
        >
          {id ? "Alterar" : "Salvar"}
        </Button>
        <Button color="gray" onClick={props.cancelled}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default Form;
