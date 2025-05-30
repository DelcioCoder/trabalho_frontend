"use client";
import { useState, useEffect } from "react";

export default function RelatoriosPage() {
  const [localidades, setLocalidades] = useState([]);

  useEffect(() => {
    async function fetchLocalidades() {
      try {
        const res = await fetch("http://localhost:8000/api/localidades/");
        if (!res.ok) throw new Error("Falha ao carregar localidades");
        const json = await res.json();
        setLocalidades(json);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLocalidades();
  }, []);



  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Pegar os dados do formulário e montar o objeto payload
    const formData = new FormData(event.target);
    const data = {
      nome: formData.get("nome"),
      idade: formData.get("idade"),
      sexo: formData.get("sexo"),
      telefone: formData.get("telefone"),
      localidade: Number(formData.get("localidade")),
    };

    // Exibe no console os dados coletados para verificação
    console.log("Dados enviados:", data);

    try {
      // Enviar requisição POST para a API com fetch
      const response = await fetch("http://localhost:8000/api/pacientes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Se a resposta não for ok, tenta extrair o JSON do erro para debug
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log("Erro de validação:", errorResponse);
        throw new Error("Erro ao enviar relatório");
      }

      // Se deu tudo certo, extrai a resposta da API
      const result = await response.json();
      console.log("Relatório enviado:", result);

      // Limpa o formulário e exibe mensagem de sucesso
      event.target.reset();
      alert("Relatório enviado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Falha ao enviar relatório. Verifique sua conexão ou tente novamente.");
    }
  };

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Relatórios de Casos</h2>
        <p className="text-gray-600 mb-6">
          Denuncie ou registre um novo caso suspeito de paludismo:
        </p>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-600 font-medium mb-2">
              Nome Completo:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="idade" className="block text-gray-600 font-medium mb-2">
              Idade:
            </label>
            <input
              type="text"
              id="idade"
              name="idade"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="sexo" className="block text-gray-600 font-medium mb-2">
              Sexo:
            </label>
            <select
              id="sexo"
              name="sexo"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="telefone" className="block text-gray-600 font-medium mb-2">
              Telefone:
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              required
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

  
          <select
            id="localidade"
            name="localidade"
            required
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Selecione uma localidade</option>
            {localidades.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.nome}
              </option>
            ))}
          </select>


          <button type="submit" className="bg-green-600 mt-4 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Enviar Relatório
          </button>
        </form>
      </div>
    </main>
  );
}
