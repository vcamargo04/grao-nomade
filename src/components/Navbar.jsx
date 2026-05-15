import { useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react'

import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

import logo from '../assets/logo.png'

export default function Navbar({
  darkMode,
  setDarkMode,
  usuario,
}) {

  const [menuOpen, setMenuOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const sair = async () => {
    await signOut(auth)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 pt-4 px-4 md:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#2d1f16]/95 dark:bg-[#181411]/95 backdrop-blur-xl border border-[#4b382d]/40 rounded-[32px] shadow-[0_10px_40px_rgba(0,0,0,0.25)] px-5 md:px-8 h-24 flex items-center justify-between transition duration-500">

          <Link
            to="/"
            className="flex items-center gap-4 hover:scale-[1.02] transition duration-300"
          >
            <img
              src={logo}
              alt="Logo Grão Nômade"
              className="w-20 h-20 object-contain"
            />

            <div>
              <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
                Grão Nômade
              </h1>

              <p className="text-gray-300 text-[10px] md:text-xs tracking-[3px] uppercase">
                Cafés especiais
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-3 rounded-full backdrop-blur-xl">
            <Link
              to="/"
              className="text-white hover:text-[#d8b08c] hover:bg-white/5 px-5 py-2 rounded-full transition duration-300"
            >
              Início
            </Link>

            <Link
              to="/sobre"
              className="text-white hover:text-[#d8b08c] hover:bg-white/5 px-5 py-2 rounded-full transition duration-300"
            >
              Sobre
            </Link>

            <Link
              to="/planos"
              className="text-white hover:text-[#d8b08c] hover:bg-white/5 px-5 py-2 rounded-full transition duration-300"
            >
              Planos
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition duration-300"
            >
              {darkMode ? (
                <Sun size={20} color="white" />
              ) : (
                <Moon size={20} color="white" />
              )}
            </button>

            {usuario ? (
              <>
                <Link
                  to="/conta"
                  className="hidden md:flex items-center justify-center px-6 h-12 rounded-full border border-white/10 text-white hover:bg-white/10 hover:scale-[1.02] transition duration-300"
                >
                  Minha Conta
                </Link>

                <button
                  onClick={sair}
                  className="hidden md:flex items-center justify-center px-6 h-12 rounded-full bg-red-500/20 border border-red-400/30 text-red-200 hover:bg-red-500/30 transition duration-300"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:flex items-center justify-center px-6 h-12 rounded-full border border-white/10 text-white hover:bg-white/10 hover:scale-[1.02] transition duration-300"
                >
                  Entrar
                </Link>

                <Link
                  to="/cadastro"
                  className="hidden md:flex items-center justify-center px-7 h-12 rounded-full bg-[#d8b08c] hover:bg-[#e7c4a4] text-[#2d1f16] font-semibold shadow-xl hover:scale-[1.04] transition duration-300"
                >
                  Criar Conta
                </Link>
              </>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition duration-300"
            >
              {menuOpen ? (
                <X size={22} color="white" />
              ) : (
                <Menu size={22} color="white" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden mt-4 bg-[#241912]/95 dark:bg-[#181411]/95 backdrop-blur-2xl border border-[#4b382d]/40 rounded-[30px] shadow-[0_10px_40px_rgba(0,0,0,0.25)] overflow-hidden animate-in slide-in-from-top-2 duration-300">
            <nav className="flex flex-col p-5 text-white">
              <Link
                to="/"
                className="p-5 rounded-2xl hover:bg-white/5 transition"
                onClick={() => setMenuOpen(false)}
              >
                Início
              </Link>

              <Link
                to="/sobre"
                className="p-5 rounded-2xl hover:bg-white/5 transition"
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </Link>

              <Link
                to="/planos"
                className="p-5 rounded-2xl hover:bg-white/5 transition"
                onClick={() => setMenuOpen(false)}
              >
                Planos
              </Link>

              {usuario ? (
                <>
                  <Link
                    to="/conta"
                    className="mt-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Minha Conta
                  </Link>

                  <button
                    onClick={sair}
                    className="mt-3 p-5 rounded-2xl bg-red-500/20 text-red-200 text-left hover:bg-red-500/30 transition"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mt-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Entrar
                  </Link>

                  <Link
                    to="/cadastro"
                    className="mt-3 p-5 rounded-2xl bg-[#d8b08c] text-[#2d1f16] font-semibold text-center hover:bg-[#e7c4a4] transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Criar conta
                  </Link>
                </>
              )}

              <button
                onClick={toggleDarkMode}
                className="mt-4 h-14 rounded-2xl bg-[#3a2a1f] hover:bg-[#4b382d] flex items-center justify-center gap-3 transition duration-300"
              >
                {darkMode ? (
                  <>
                    <Sun size={20} color="white" />
                    <span>Modo Claro</span>
                  </>
                ) : (
                  <>
                    <Moon size={20} color="white" />
                    <span>Modo Escuro</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}