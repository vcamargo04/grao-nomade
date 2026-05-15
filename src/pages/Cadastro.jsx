import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

import { auth, db } from '../firebase'

export default function Cadastro({ usuario }) {
  const navigate = useNavigate()

  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  if (usuario) {
    return <Navigate to="/conta" />
  }

  const criarConta = async () => {
    setMensagem('')
    setErro('')

    if (!nome || !sobrenome || !email || !telefone || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos para criar sua conta.')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, senha)

      await updateProfile(credencial.user, {
        displayName: `${nome} ${sobrenome}`
      })

      await setDoc(doc(db, 'usuarios', credencial.user.uid), {
        nome,
        sobrenome,
        nomeCompleto: `${nome} ${sobrenome}`,
        email,
        telefone,
        cpf: '',
        endereco: {
          cep: '',
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: ''
        },
        criadoEm: serverTimestamp()
      })

      setMensagem('Conta criada com sucesso! Redirecionando para sua área do cliente...')

      setTimeout(() => {
        navigate('/conta')
      }, 1500)
    } catch (error) {
      console.log(error)

      if (error.code === 'auth/email-already-in-use') {
        setErro('Este e-mail já está cadastrado.')
      } else if (error.code === 'auth/invalid-email') {
        setErro('Digite um e-mail válido.')
      } else if (error.code === 'auth/weak-password') {
        setErro('A senha é muito fraca.')
      } else {
        setErro('Erro ao criar conta. Tente novamente.')
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
              Faça parte do clube dos cafés especiais.
            </h1>

            <p className="text-gray-300 text-xl leading-relaxed max-w-lg">
              Crie sua conta e tenha acesso a experiências premium,
              assinaturas exclusivas e benefícios personalizados.
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
              Cadastro
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2d1f16] dark:text-white mb-6">
              Criar Conta
            </h2>

            <p className="text-[#4b382d] dark:text-gray-300 text-lg leading-relaxed">
              Cadastre-se para acessar os planos exclusivos,
              acompanhar pedidos e participar do clube premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
            />

            <input
              type="text"
              placeholder="Sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
            />

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition md:col-span-2"
            />

            <input
              type="text"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition md:col-span-2"
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

            <div className="relative">
              <input
                type={mostrarConfirmar ? 'text' : 'password'}
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition"
              />

              <button
                type="button"
                onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              >
                {mostrarConfirmar ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-[#3a2a1f] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  senha.length === 0
                    ? 'w-0'
                    : senha.length < 5
                    ? 'w-[30%] bg-red-500'
                    : senha.length < 8
                    ? 'w-[60%] bg-yellow-500'
                    : 'w-full bg-green-500'
                }`}
              ></div>
            </div>

            <p className="text-sm text-[#4b382d] dark:text-gray-300 mt-3">
              {senha.length === 0
                ? 'Digite uma senha'
                : senha.length < 5
                ? 'Senha fraca'
                : senha.length < 8
                ? 'Senha média'
                : 'Senha forte'}
            </p>
          </div>

          {mensagem && (
            <div className="mt-8 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 p-5 rounded-2xl text-center font-semibold">
              {mensagem}
            </div>
          )}

          {erro && (
            <div className="mt-8 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 p-5 rounded-2xl text-center font-semibold">
              {erro}
            </div>
          )}

          <button
            onClick={criarConta}
            className="w-full mt-10 bg-[#2d1f16] hover:bg-[#442f22] text-white py-5 rounded-2xl text-lg transition hover:scale-[1.01] shadow-xl"
          >
            Criar Conta
          </button>

          <button className="w-full mt-5 border-2 border-gray-300 dark:border-[#4b382d] dark:text-white py-5 rounded-2xl text-lg hover:bg-gray-100 dark:hover:bg-[#181411] transition">
            Criar conta com Google
          </button>

          <div className="text-center mt-10">
            <p className="text-[#4b382d] dark:text-gray-300">
              Já possui uma conta?
            </p>

            <Link to="/login">
              <button className="mt-5 border-2 border-[#2d1f16] dark:border-white text-[#2d1f16] dark:text-white px-8 py-4 rounded-2xl hover:bg-[#2d1f16] hover:text-white transition">
                Entrar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}