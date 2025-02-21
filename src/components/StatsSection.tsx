import Image from 'next/image';

export default function StatsSection() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 py-16 bg-white">
      {/* Texto e estatísticas */}
      <div className="w-full md:w-1/2 md:pr-10 space-y-4">
        <h2 className="text-4xl font-bold text-green-600">
          Estatísticas de Paludismo
        </h2>
        <p className="text-2xl text-gray-700">
          Existem <span className="font-bold text-green-600">1,349,166</span>{' '}
          casos ativos de Paludismo no mundo (exemplo).
        </p>
        <p className="text-gray-600">
          Isso representa um aumento de{' '}
          <span className="font-semibold">+70,640</span> casos em relação ao dia
          anterior, e <span className="font-semibold">+80,281</span> desde sua
          última visita, há 2 dias.
        </p>
        <p className="text-sm text-gray-500">
          <em>*Valores de exemplo para ilustração</em>
        </p>
      </div>

      {/* Imagem (mapa ou gráfico) */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 relative">
        <Image
          src="/images/paludismo-map.png" // Ajuste para o caminho real da sua imagem
          alt="Mapa de casos de paludismo"
          width={600}
          height={400}
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
