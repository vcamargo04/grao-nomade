import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc
} from 'firebase/firestore'

import { auth, db } from '../firebase'

export default function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()

  const plano = location.state || {
    planoId: 'barista',
    planoNome: 'Barista',
    planoPreco: 'R$ 89,90',
    planoDescricao: 'Assinatura mensal premium'
  }

  const [metodo, setMetodo] = useState('pix')

  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  const [cep, setCep] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState('')

  const [cpfBloqueado, setCpfBloqueado] = useState(false)

  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  const [pedidoFinalizado, setPedidoFinalizado] = useState(false)
  const [qrValue, setQrValue] = useState('')

  useEffect(() => {
    const carregarDadosUsuario = async () => {
      const usuario = auth.currentUser

      if (!usuario) return

      try {
        const ref = doc(db, 'usuarios', usuario.uid)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          const dados = snap.data()

          setNome(dados.nomeCompleto || '')
          setCpf(dados.cpf || '')
          setEmail(dados.email || usuario.email || '')
          setTelefone(dados.telefone || '')

          setCep(dados.endereco?.cep || '')
          setRua(dados.endereco?.rua || '')
          setNumero(dados.endereco?.numero || '')
          setComplemento(dados.endereco?.complemento || '')
          setBairro(dados.endereco?.bairro || '')
          setCidade(dados.endereco?.cidade || '')
          setEstado(dados.endereco?.estado || '')

          if (dados.cpf) {
            setCpfBloqueado(true)
          }
        } else {
          setEmail(usuario.email || '')
          setNome(usuario.displayName || '')
        }
      } catch (error) {
        console.log(error)
      }
    }

    carregarDadosUsuario()
  }, [])

  const finalizarPedido = async () => {
    setMensagem('')
    setErro('')

    const usuario = auth.currentUser

    if (!usuario) {
      setErro('Você precisa estar logado para finalizar a assinatura.')

      setTimeout(() => {
        navigate('/login')
      }, 1500)

      return
    }

    if (!nome || !cpf || !email || !telefone || !cep || !rua || !numero || !bairro || !cidade || !estado) {
      setErro('Preencha todos os campos obrigatórios antes de finalizar.')
      return
    }

    try {
      const endereco = {
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado
      }

      const pedidoRef = await addDoc(collection(db, 'usuarios', usuario.uid, 'pedidos'), {
        planoId: plano.planoId,
        planoNome: plano.planoNome,
        planoPreco: plano.planoPreco,
        planoDescricao: plano.planoDescricao,
        metodoPagamento: metodo,
        status: metodo === 'pix' ? 'Aguardando PIX demonstrativo' : 'Pagamento aprovado',
        nome,
        cpf,
        email,
        telefone,
        endereco,
        criadoEm: serverTimestamp()
      })

      await setDoc(
        doc(db, 'usuarios', usuario.uid),
        {
          nomeCompleto: nome,
          email,
          telefone,
          cpf,
          endereco,
          planoAtual: plano.planoNome,
          ultimoPedido: plano.planoNome,
          atualizadoEm: serverTimestamp()
        },
        { merge: true }
      )

      setPedidoFinalizado(true)

      if (metodo === 'pix') {
        setQrValue(
          `Obrigado por testar o projeto Grão Nômade!\n\nCompra demonstrativa finalizada com sucesso.\nPlano: ${plano.planoNome}\nValor: ${plano.planoPreco}\nPedido: ${pedidoRef.id.slice(0, 8).toUpperCase()}`
        )

        setMensagem('Pedido criado com sucesso! Escaneie o QR Code PIX demonstrativo abaixo.')
        return
      }

      setMensagem(`Pedido finalizado com sucesso! Uma confirmação demonstrativa foi enviada para ${email}.`)

      setTimeout(() => {
        navigate('/conta')
      }, 2500)

    } catch (error) {
      console.log(error)
      setErro('Erro ao finalizar assinatura. Tente novamente.')
    }
  }

  return (
    <main className="bg-[#f7f2eb] dark:bg-[#181411] min-h-screen py-14 md:py-24 px-5 md:px-8 transition duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 bg-white dark:bg-[#241912] rounded-[35px] shadow-2xl p-6 md:p-12 transition duration-500">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f16] dark:text-white mb-12">
            Finalizar Compra
          </h1>

          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#2d1f16] dark:text-white">
              Dados pessoais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />

              <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} readOnly={cpfBloqueado} className={`p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] dark:bg-[#181411] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition ${cpfBloqueado ? 'bg-gray-100 text-gray-500 cursor-not-allowed dark:text-gray-400' : 'bg-white'}`} />

              <input type="email" placeholder="E-mail" value={email} readOnly className="p-5 rounded-2xl border bg-gray-100 text-gray-500 dark:bg-[#181411] dark:border-[#4b382d] dark:text-gray-400 cursor-not-allowed" />

              <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
            </div>
          </div>

          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#2d1f16] dark:text-white">
              Endereço de entrega
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
              <input type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
              <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
              <input type="text" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
              <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
              <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
              <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition md:col-span-2" />
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#2d1f16] dark:text-white">
              Método de pagamento
            </h2>

            <div className="flex flex-wrap gap-4 mb-10">
              {['pix', 'cartao', 'boleto'].map((opcao) => (
                <button
                  key={opcao}
                  onClick={() => {
                    setMetodo(opcao)
                    setPedidoFinalizado(false)
                    setQrValue('')
                    setMensagem('')
                  }}
                  className={`px-8 py-4 rounded-2xl transition font-semibold ${
                    metodo === opcao
                      ? 'bg-[#2d1f16] text-white'
                      : 'bg-[#f7f2eb] dark:bg-[#3a2a1f] dark:text-white'
                  }`}
                >
                  {opcao === 'pix' ? 'PIX' : opcao === 'cartao' ? 'Cartão' : 'Boleto'}
                </button>
              ))}
            </div>

            {metodo === 'pix' && (
              <div className="bg-[#f7f2eb] dark:bg-[#3a2a1f] p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-5 text-[#2d1f16] dark:text-white">
                  Pagamento via PIX
                </h3>

                {!pedidoFinalizado ? (
                  <div className="bg-white dark:bg-[#241912] h-64 rounded-3xl mb-6 flex items-center justify-center shadow-lg">
                    <p className="text-center text-[#2d1f16] dark:text-white font-semibold px-8">
                      O QR Code PIX demonstrativo aparecerá após clicar em Finalizar Assinatura.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#241912] rounded-3xl mb-6 flex flex-col items-center justify-center shadow-lg p-8">
                    <div className="bg-white p-4 rounded-2xl">
                      <QRCodeCanvas value={qrValue} size={180} />
                    </div>

                    <p className="text-center text-[#4b382d] dark:text-gray-300 mt-5">
                      Escaneie para ver a mensagem de confirmação do projeto.
                    </p>
                  </div>
                )}

                <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                  Este PIX é demonstrativo e não realiza cobrança real.
                </p>
              </div>
            )}

            {metodo === 'cartao' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Nome no cartão" className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition md:col-span-2" />
                <input type="text" placeholder="Número do cartão" className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition md:col-span-2" />
                <input type="text" placeholder="Validade" className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
                <input type="text" placeholder="CVV" className="p-5 rounded-2xl border border-gray-300 dark:border-[#4b382d] bg-white dark:bg-[#181411] text-[#2d1f16] dark:text-white outline-none focus:ring-2 focus:ring-[#8b5e3c] transition" />
              </div>
            )}

            {metodo === 'boleto' && (
              <div className="bg-[#f7f2eb] dark:bg-[#3a2a1f] p-8 rounded-3xl">
                <h3 className="text-2xl font-bold mb-5 text-[#2d1f16] dark:text-white">
                  Pagamento via boleto
                </h3>

                <div className="bg-white dark:bg-[#241912] p-6 rounded-2xl mb-6">
                  <div className="h-10 bg-[#2d1f16] rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>

                <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                  O boleto é demonstrativo e não gera cobrança real.
                </p>
              </div>
            )}
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
            onClick={finalizarPedido}
            className="w-full mt-12 bg-[#2d1f16] text-white py-5 rounded-2xl text-lg hover:bg-[#442f22] transition hover:scale-[1.01]"
          >
            Finalizar Assinatura
          </button>

          {pedidoFinalizado && metodo === 'pix' && (
            <button
              onClick={() => navigate('/conta')}
              className="w-full mt-5 border-2 border-[#2d1f16] dark:border-white text-[#2d1f16] dark:text-white py-5 rounded-2xl text-lg hover:bg-[#2d1f16] hover:text-white transition"
            >
              Ir para minha conta
            </button>
          )}
        </div>

        <div className="bg-white dark:bg-[#241912] rounded-[35px] shadow-2xl p-8 md:p-10 h-fit lg:sticky lg:top-28 transition duration-500">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d1f16] dark:text-white mb-10">
            Carrinho
          </h2>

          <div className="bg-[#f7f2eb] dark:bg-[#3a2a1f] p-6 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-3 text-[#2d1f16] dark:text-white">
              Plano {plano.planoNome}
            </h3>

            <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed mb-5">
              {plano.planoDescricao}
            </p>

            <p className="text-3xl font-bold text-[#8b5e3c]">
              {plano.planoPreco}
            </p>
          </div>

          <div className="space-y-4 mb-10 text-[#2d1f16] dark:text-white">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{plano.planoPreco}</p>
            </div>

            <div className="flex justify-between">
              <p>Frete</p>
              <p>Grátis</p>
            </div>

            <div className="border-t border-gray-300 dark:border-[#4b382d] pt-4 flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>{plano.planoPreco}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            Compra protegida com criptografia e processamento seguro.
          </p>
        </div>
      </div>
    </main>
  )
}