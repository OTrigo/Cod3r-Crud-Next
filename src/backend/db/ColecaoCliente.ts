import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import firebase from "firebase/compat/app";

export default class ColecaoCliente implements ClienteRepositorio {
  #converter = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(
      snapshot: firebase.firestore.QueryDocumentSnapshot,
      options: firebase.firestore.SnapshotOptions
    ) {
      const dados = snapshot.data(options);
      return new Cliente(dados?.nome, dados?.idade, snapshot?.id);
    },
  };

  async save(cliente: Cliente): Promise<Cliente> {
    if (cliente.id) {
      await this.collection().doc(cliente?.id).set(cliente);
      return cliente;
    } else {
      const docRef = await this.collection().add(cliente);
      const doc = docRef.get();

      //@ts-ignore
      return doc?.data() as Cliente;
    }
  }

  async delete(cliente: Cliente): Promise<void> {
    if (cliente.id) {
      return this.collection().doc(cliente?.id).delete();
    }
  }

  async getAll(): Promise<Cliente[]> {
    const query = await this.collection().get();
    return query.docs.map((doc) => doc.data());
  }

  private collection() {
    return firebase
      .firestore()
      .collection("clientes")
      .withConverter(this.#converter);
  }
}
