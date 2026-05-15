import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login({ usuario }) {
  const navigate = useNavigate()

  const [mostrarSenha, setMostrarSenha] = useState(false)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  if (usuario) {
    return <Navigate to="/conta" />
  }

  const entrar = async () => {
    setMensagem('')
    setErro('')

    if (!email || !senha) {
      setErro('Digite seu e-mail e sua senha para entrar.')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha)

      setMensagem('Login realizado com sucesso! Redirecionando...')

      setTimeout(() => {
        navigate('/conta')
      }, 1200)
    } catch (error) {
      console.log(error)

      if (error.code === 'auth/invalid-email') {
        setErro('Digite um e-mail válido.')
      } else if (error.code === 'auth/user-not-found') {
        setErro('Usuário não encontrado.')
      } else if (error.code === 'auth/wrong-password') {
        setErro('Senha incorreta.')
      } else if (error.code === 'auth/invalid-credential') {
        setErro('E-mail ou senha incorretos.')
      } else {
        setErro('Erro ao entrar. Tente novamente.')
      }
    }
  }

  return (
    <main className="bg-[#f7f2eb] dark:bg-[#181411] min-h-screen flex items-center justify-center px-5 md:px-8 py-20 transition duration-500">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[40px] shadow-2xl">
        <div className="hidden lg:flex bg-[#2d1f16] relative items-center justify-center p-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d1f16] to-[#4b382d]" />

          <div className="relative z-10">
            <p className="uppercase tracking-[6px] text-[#d8b08c] mb-6 font-semibold text-sm">
              Grão Nômade
            </p>

            <h1 className="text-6xl font-bold text-white leading-tight mb-8">
              Sua experiência premium em cafés especiais.
            </h1>

            <p className="text-gray-300 text-xl leading-relaxed max-w-lg">
              Acesse sua conta para acompanhar pedidos, fidelidade,
              experiências exclusivas e benefícios premium.
            </p>

            <div className="mt-14 bg-[#3a2a1f] h-64 rounded-[35px] flex items-center justify-center shadow-2xl">
              <p className="text-[#d8b08c] text-xl font-semibold">
                Espaço para imagem do projeto
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#241912] p-8 md:p-14 transition duration-500">
          <div className="mb-12 text-center lg:text-left">
            <p className="uppercase tracking-[6px] text-[#8b5e3c] dark:text-[#d8b08c] mb-5 font-semibold text-sm">
              Área do cliente
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2d1f16] dark:text-white mb-6">
              Entrar na conta
            </h2>

            <p className="text-[#4b382d] dark:text-gray-300 text-lg leading-relaxed">
              Acesse seus pedidos, fidelidade, histórico de assinaturas
              e benefícios exclusivos.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
            />

            <div className="relative">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {mostrarSenha ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            <div className="flex justify-end">
              <button className="text-[#8b5e3c] dark:text-[#d8b08c] hover:underline text-sm">
                Esqueci minha senha
              </button>
            </div>

            {mensagem && (
              <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 p-5 rounded-2xl text-center font-semibold">
                {mensagem}
              </div>
            )}

            {erro && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 p-5 rounded-2xl text-center font-semibold">
                {erro}
              </div>
            )}

            <button
              onClick={entrar}
              className="bg-[#2d1f16] hover:bg-[#442f22] text-white py-5 rounded-2xl text-lg transition hover:scale-[1.01] shadow-xl"
            >
              Entrar
            </button>

            <button className="border-2 border-gray-300 dark:border-[#4b382d] dark:text-white py-5 rounded-2xl text-lg hover:bg-gray-100 dark:hover:bg-[#181411] transition">
              Entrar com Google
            </button>
          </div>

          <div className="text-center mt-10">
            <p className="text-[#4b382d] dark:text-gray-300">
              Ainda não possui cadastro?
            </p>

            <Link to="/cadastro">
              <button className="mt-5 border-2 border-[#2d1f16] dark:border-white text-[#2d1f16] dark:text-white px-8 py-4 rounded-2xl hover:bg-[#2d1f16] hover:text-white transition">
                Criar Conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}