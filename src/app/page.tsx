"use client";
import Layout from "@/components/Layout";
import Cliente from "@/core/Cliente";

export default function Home() {
  
  return (
    <main className="flex h-screen justify-center items-center bg-gradient-to-r from-red-900 to bg-purple-700 text-white">
      <Layout
        title="CRUD Simples em Next"
      >
        <span>Conteúdo do Teste 1</span>
      </Layout>
    </main>
  );
}
