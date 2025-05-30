export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-br from-green-400 to-green-600 fixed inset-0">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </div>
      
      {/* Card principal */}
      <div className="relative bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 sm:mx-0 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}