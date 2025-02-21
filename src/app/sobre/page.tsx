// app/sobre/page.jsx
export default function Page() {
    return (
      <main className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Sobre o Projeto</h2>
          <p className="text-gray-600 leading-relaxed">
            Nosso objetivo é rastrear e combater o paludismo no município do Cazenga por meio do mapeamento de casos, distribuição de recursos e conscientização da população. Este site se integra a uma API desenvolvida com Django Rest Framework (DRF), que permite cadastrar e visualizar dados de pacientes diagnosticados com paludismo.
          </p>
        </div>
      </main>
    );
  }
  