import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import firebase from "../config";

export default class ColecaoCliente implements ClienteRepositorio {
  private collection() {
    return firebase.firestore().collection("clientes").withConverter(this.converter);
  }

  private converter = {
    toFirestore(cliente: Cliente) {
      return {
        nome: cliente.getNome,
        idade: cliente.getIdade,
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
    if (cliente.getId) {
      await this.collection().doc(cliente.getId).set(cliente);
      return cliente;
    } else {
      const docRef = await this.collection().add(cliente);
      const doc = await docRef.get();

      return doc.data() as Cliente;
    }
  }

  async delete(cliente: Cliente): Promise<void> {
    if (cliente.getId) {
      return this.collection().doc(cliente.getId).delete();
    }
  }

  async getAll(): Promise<Cliente[]> {
    const query = await this.collection().get();
    return query.docs.map((doc) => doc.data() as Cliente);
  }
}
