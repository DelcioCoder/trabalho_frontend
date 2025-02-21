// app/contribuir/page.jsx
export default function Page() {
    return (
      <main className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Como Contribuir</h2>
          <p className="text-gray-600 mb-8">
            Você pode apoiar a luta contra o paludismo no Cazenga de várias maneiras:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">Doações</h3>
              <p className="text-gray-600 mb-4">
                Contribua para a aquisição de mosquiteiros e medicamentos.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Saiba Mais
              </button>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">Voluntariado</h3>
              <p className="text-gray-600 mb-4">
                Participe de campanhas de conscientização na comunidade.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Inscreva-se
              </button>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <h3 className="text-xl font-semibold text-green-600 mb-2">Parcerias</h3>
              <p className="text-gray-600 mb-4">
                Seja um parceiro e ajude a expandir este projeto.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Entre em Contato
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }
  