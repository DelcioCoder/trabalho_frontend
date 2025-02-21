"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-green-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Marca */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              Rastreamento de Paludismo
            </Link>
          </div>

          {/* Botão do menu mobile */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="focus:outline-none text-white hover:text-gray-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    className="transition-all duration-300"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="transition-all duration-300"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link href="/" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-green-600">
              Home
            </Link>
            <Link href="/sobre" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-green-600">
              Sobre o Projeto
            </Link>
            <Link href="/relatorios" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-green-600">
              Relatórios de Casos
            </Link>
            <Link href="/contribuir" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-green-600">
              Como Contribuir
            </Link>
            <Link href="/contato" className="rounded-md px-3 py-2 text-sm font-medium hover:bg-green-600">
              Contato
            </Link>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-green-500" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-green-600">
              Home
            </Link>
            <Link href="/sobre" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-green-600">
              Sobre o Projeto
            </Link>
            <Link href="/relatorios" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-green-600">
              Relatórios de Casos
            </Link>
            <Link href="/contribuir" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-green-600">
              Como Contribuir
            </Link>
            <Link href="/contato" className="block rounded-md px-3 py-2 text-base font-medium hover:bg-green-600">
              Contato
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
