import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import {
  Package,
  User,
  MapPin,
  Headset,
  Truck
} from 'lucide-react'

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'

import { updateProfile } from 'firebase/auth'

import { db } from '../firebase'

export default function Conta({ usuario }) {
  const [abaAtiva, setAbaAtiva] = useState('pedidos')

  const [carregando, setCarregando] = useState(true)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const [ticket, setTicket] = useState('')
  const [pedidos, setPedidos] = useState([])

  const [dados, setDados] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    cpf: '',
    planoAtual: 'Nenhum',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  })

  useEffect(() => {
    const carregarDados = async () => {
      if (!usuario) return

      try {
        const ref = doc(db, 'usuarios', usuario.uid)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          setDados((prev) => ({
            ...prev,
            ...snap.data(),
            endereco: {
              ...prev.endereco,
              ...(snap.data().endereco || {})
            }
          }))
        } else {
          const dadosIniciais = {
            nomeCompleto: usuario.displayName || usuario.email.split('@')[0],
            email: usuario.email,
            telefone: '',
            cpf: '',
            planoAtual: 'Nenhum',
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
          }

          await setDoc(ref, dadosIniciais)
          setDados(dadosIniciais)
        }

        const pedidosRef = collection(db, 'usuarios', usuario.uid, 'pedidos')
        const pedidosQuery = query(pedidosRef, orderBy('criadoEm', 'desc'))
        const pedidosSnap = await getDocs(pedidosQuery)

        const listaPedidos = pedidosSnap.docs.map((documento) => ({
          id: documento.id,
          ...documento.data()
        }))

        setPedidos(listaPedidos)
      } catch (error) {
        console.log(error)
        setErro('Erro ao carregar seus dados.')
      } finally {
        setCarregando(false)
      }
    }

    carregarDados()
  }, [usuario])

  if (!usuario) {
    return <Navigate to="/login" />
  }

  if (carregando) {
    return (
      <main className="bg-[#f7f2eb] dark:bg-[#181411] min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold text-[#2d1f16] dark:text-white">
          Carregando sua conta...
        </p>
      </main>
    )
  }

  const nomeUsuario = dados.nomeCompleto || usuario.email.split('@')[0]
  const emailUsuario = dados.email || usuario.email
  const iniciais = nomeUsuario.slice(0, 2).toUpperCase()

  const planoAtual =
    pedidos.length > 0
      ? pedidos[0].planoNome
      : dados.planoAtual || 'Nenhum'

  const pontosFidelidade = pedidos.length * 120

  const atualizarCampo = (campo, valor) => {
    setDados((prev) => ({
      ...prev,
      [campo]: valor
    }))
  }

  const atualizarEndereco = (campo, valor) => {
    setDados((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [campo]: valor
      }
    }))
  }

  const salvarDados = async () => {
    setMensagem('')
    setErro('')

    try {
      const ref = doc(db, 'usuarios', usuario.uid)

      await updateDoc(ref, {
        nomeCompleto: dados.nomeCompleto,
        telefone: dados.telefone,
        endereco: dados.endereco,
        atualizadoEm: serverTimestamp()
      })

      await updateProfile(usuario, {
        displayName: dados.nomeCompleto
      })

      setMensagem('Dados atualizados com sucesso.')
    } catch (error) {
      console.log(error)
      setErro('Erro ao salvar alterações.')
    }
  }

  const enviarTicket = async () => {
    setMensagem('')
    setErro('')

    if (!ticket.trim()) {
      setErro('Digite uma mensagem para abrir o ticket.')
      return
    }

    try {
      await addDoc(collection(db, 'tickets'), {
        usuarioId: usuario.uid,
        nome: nomeUsuario,
        email: emailUsuario,
        mensagem: ticket,
        status: 'Aberto',
        criadoEm: serverTimestamp()
      })

      setTicket('')
      setMensagem('Ticket enviado com sucesso.')
    } catch (error) {
      console.log(error)
      setErro('Erro ao enviar ticket.')
    }
  }

  return (
    <main className="bg-[#f7f2eb] dark:bg-[#181411] min-h-screen px-4 md:px-8 py-8 md:py-12 transition duration-500">
      <div className="max-w-7xl mx-auto">

        {mensagem && (
          <div className="mb-6 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 p-5 rounded-2xl text-center font-semibold">
            {mensagem}
          </div>
        )}

        {erro && (
          <div className="mb-6 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-300 p-5 rounded-2xl text-center font-semibold">
            {erro}
          </div>
        )}

        <div className="bg-white dark:bg-[#241912] rounded-[35px] shadow-2xl p-6 md:p-10 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2d1f16] to-[#8b5e3c] flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {iniciais}
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#2d1f16] dark:text-white">
                  {nomeUsuario}
                </h1>

                <p className="text-[#8b5e3c] text-lg font-semibold mt-1">
                  Cliente Grão Nômade
                </p>

                <p className="text-[#4b382d] dark:text-gray-300 mt-2">
                  {emailUsuario}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full lg:w-auto">
              <div className="bg-[#f7f2eb] dark:bg-[#181411] p-5 rounded-3xl min-w-[140px]">
                <p className="text-sm text-[#4b382d] dark:text-gray-300">
                  Pedidos
                </p>

                <h2 className="text-3xl font-bold text-[#2d1f16] dark:text-white mt-2">
                  {pedidos.length}
                </h2>
              </div>

              <div className="bg-[#f7f2eb] dark:bg-[#181411] p-5 rounded-3xl min-w-[140px]">
                <p className="text-sm text-[#4b382d] dark:text-gray-300">
                  Fidelidade
                </p>

                <h2 className="text-3xl font-bold text-[#2d1f16] dark:text-white mt-2">
                  {pontosFidelidade}
                </h2>
              </div>

              <div className="bg-[#f7f2eb] dark:bg-[#181411] p-5 rounded-3xl min-w-[140px] col-span-2 md:col-span-1">
                <p className="text-sm text-[#4b382d] dark:text-gray-300">
                  Plano
                </p>

                <h2 className="text-xl font-bold text-[#2d1f16] dark:text-white mt-2">
                  {planoAtual}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="bg-white dark:bg-[#241912] rounded-[35px] shadow-2xl p-5 h-fit">
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              <button
                onClick={() => setAbaAtiva('pedidos')}
                className={`flex items-center gap-3 min-w-fit lg:w-full p-4 rounded-2xl transition ${
                  abaAtiva === 'pedidos'
                    ? 'bg-[#2d1f16] text-white'
                    : 'bg-[#f7f2eb] dark:bg-[#181411] dark:text-white'
                }`}
              >
                <Package size={20} />
                Meus pedidos
              </button>

              <button
                onClick={() => setAbaAtiva('dados')}
                className={`flex items-center gap-3 min-w-fit lg:w-full p-4 rounded-2xl transition ${
                  abaAtiva === 'dados'
                    ? 'bg-[#2d1f16] text-white'
                    : 'bg-[#f7f2eb] dark:bg-[#181411] dark:text-white'
                }`}
              >
                <User size={20} />
                Meus dados
              </button>

              <button
                onClick={() => setAbaAtiva('enderecos')}
                className={`flex items-center gap-3 min-w-fit lg:w-full p-4 rounded-2xl transition ${
                  abaAtiva === 'enderecos'
                    ? 'bg-[#2d1f16] text-white'
                    : 'bg-[#f7f2eb] dark:bg-[#181411] dark:text-white'
                }`}
              >
                <MapPin size={20} />
                Endereços
              </button>

              <button
                onClick={() => setAbaAtiva('suporte')}
                className={`flex items-center gap-3 min-w-fit lg:w-full p-4 rounded-2xl transition ${
                  abaAtiva === 'suporte'
                    ? 'bg-[#2d1f16] text-white'
                    : 'bg-[#f7f2eb] dark:bg-[#181411] dark:text-white'
                }`}
              >
                <Headset size={20} />
                Suporte
              </button>
            </div>
          </aside>

          <section className="lg:col-span-3 bg-white dark:bg-[#241912] rounded-[35px] shadow-2xl p-6 md:p-10">
            {abaAtiva === 'pedidos' && (
              <div>
                <h1 className="text-4xl font-bold text-[#2d1f16] dark:text-white mb-10">
                  Meus pedidos
                </h1>

                {pedidos.length === 0 ? (
                  <div className="bg-[#f7f2eb] dark:bg-[#181411] rounded-3xl p-8 text-center">
                    <Truck className="text-[#8b5e3c] mx-auto mb-5" size={42} />

                    <h2 className="text-2xl font-bold text-[#2d1f16] dark:text-white mb-4">
                      Nenhum pedido encontrado
                    </h2>

                    <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                      Quando você finalizar uma assinatura, seus pedidos aparecerão aqui.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pedidos.map((pedido) => (
                      <div
                        key={pedido.id}
                        className="bg-[#f7f2eb] dark:bg-[#181411] rounded-3xl p-6"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <Truck className="text-[#8b5e3c]" />

                              <h2 className="text-2xl font-bold text-[#2d1f16] dark:text-white">
                                {pedido.planoNome}
                              </h2>
                            </div>

                            <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                              {pedido.planoDescricao}
                            </p>

                            <p className="text-sm text-[#8b5e3c] mt-3">
                              Código: #{pedido.id.slice(0, 8).toUpperCase()}
                            </p>

                            <p className="text-sm text-[#4b382d] dark:text-gray-300 mt-2">
                              Pagamento: {pedido.metodoPagamento?.toUpperCase()}
                            </p>
                          </div>

                          <div className="text-left lg:text-right">
                            <p className="text-3xl font-bold text-[#8b5e3c]">
                              {pedido.planoPreco}
                            </p>

                            <p className="text-green-600 font-semibold mt-2">
                              {pedido.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {abaAtiva === 'dados' && (
              <div>
                <h1 className="text-4xl font-bold text-[#2d1f16] dark:text-white mb-10">
                  Meus dados
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={dados.nomeCompleto}
                    onChange={(e) => atualizarCampo('nomeCompleto', e.target.value)}
                    placeholder="Nome completo"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="email"
                    value={emailUsuario}
                    readOnly
                    className="p-5 rounded-2xl border bg-gray-100 text-gray-500 dark:bg-[#181411] dark:border-[#4b382d] dark:text-gray-400 cursor-not-allowed"
                  />

                  <input
                    type="text"
                    value={dados.telefone}
                    onChange={(e) => atualizarCampo('telefone', e.target.value)}
                    placeholder="Telefone"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="text"
                    value={dados.cpf || 'CPF bloqueado'}
                    readOnly
                    className="p-5 rounded-2xl border bg-gray-100 text-gray-500 dark:bg-[#181411] dark:border-[#4b382d] dark:text-gray-400 cursor-not-allowed"
                  />
                </div>

                <button
                  onClick={salvarDados}
                  className="mt-8 bg-[#2d1f16] hover:bg-[#442f22] text-white px-8 py-4 rounded-2xl transition"
                >
                  Salvar alterações
                </button>
              </div>
            )}

            {abaAtiva === 'enderecos' && (
              <div>
                <h1 className="text-4xl font-bold text-[#2d1f16] dark:text-white mb-10">
                  Endereço
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    value={dados.endereco?.cep || ''}
                    onChange={(e) => atualizarEndereco('cep', e.target.value)}
                    placeholder="CEP"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="text"
                    value={dados.endereco?.rua || ''}
                    onChange={(e) => atualizarEndereco('rua', e.target.value)}
                    placeholder="Rua"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="text"
                    value={dados.endereco?.numero || ''}
                    onChange={(e) => atualizarEndereco('numero', e.target.value)}
                    placeholder="Número"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="text"
                    value={dados.endereco?.complemento || ''}
                    onChange={(e) => atualizarEndereco('complemento', e.target.value)}
                    placeholder="Complemento"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="text"
                    value={dados.endereco?.bairro || ''}
                    onChange={(e) => atualizarEndereco('bairro', e.target.value)}
                    placeholder="Bairro"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="text"
                    value={dados.endereco?.cidade || ''}
                    onChange={(e) => atualizarEndereco('cidade', e.target.value)}
                    placeholder="Cidade"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                  />

                  <input
                    type="text"
                    value={dados.endereco?.estado || ''}
                    onChange={(e) => atualizarEndereco('estado', e.target.value)}
                    placeholder="Estado"
                    className="p-5 rounded-2xl border dark:bg-[#181411] dark:border-[#4b382d] dark:text-white md:col-span-2"
                  />
                </div>

                <button
                  onClick={salvarDados}
                  className="mt-8 bg-[#2d1f16] hover:bg-[#442f22] text-white px-8 py-4 rounded-2xl transition"
                >
                  Salvar endereço
                </button>
              </div>
            )}

            {abaAtiva === 'suporte' && (
              <div>
                <h1 className="text-4xl font-bold text-[#2d1f16] dark:text-white mb-10">
                  Central de suporte
                </h1>

                <textarea
                  value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
                  placeholder="Descreva seu problema..."
                  className="w-full h-52 p-5 rounded-3xl border resize-none dark:bg-[#181411] dark:border-[#4b382d] dark:text-white"
                />

                <button
                  onClick={enviarTicket}
                  className="mt-6 bg-[#2d1f16] hover:bg-[#442f22] text-white px-8 py-4 rounded-2xl transition"
                >
                  Enviar ticket
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}