import Image from 'next/image';
import Link from 'next/link';
import image from '../../public/background.webp'

export default function Banner() {
  return (
    <section className="relative h-screen">
      {/* Imagem de fundo utilizando o componente Image do Next.js */}
      <div className="absolute inset-0">
        <Image
          src={image} 
          alt="Banner Background"
          fill
          className="object-cover"
          priority
        />
      </div>  // Armazenar tokens no localStorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
      {/* Overlay para melhorar a legibilidade do texto */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Conteúdo centralizado */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-5xl font-bold text-white mb-4">Juntos contra o Paludismo!</h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
          Participe ativamente na luta contra o paludismo no Cazenga. Junte-se a nós para mapear casos, conscientizar a comunidade e salvar vidas.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/relatorios">
            <button className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200">
              Relatar Novo Caso
            </button>
          </Link>
          <Link href="/sobre">
            <button className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200">
              Saiba Mais
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
