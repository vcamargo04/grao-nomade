import { useParams, Link } from 'react-router-dom'

const planos = {

  explorador: {

    nome: 'Explorador',

    preco: 'R$ 49,90',

    descricao:
      'Ideal para quem deseja iniciar no universo dos cafés especiais com praticidade e experiências únicas.',

    beneficios: [
      '1 caixa mensal com cafés especiais selecionados',
      'Cafés nacionais premium',
      'Guia de degustação exclusivo',
      'Acesso ao sistema fidelidade',
      'Experiência introdutória ao universo dos cafés especiais',
    ],

    experiencia:
      'Uma experiência desenvolvida para apresentar novos sabores, aromas e métodos de preparo para consumidores iniciantes.',

    inclui: [
      '250g de café especial',
      'Cartão explicativo do produtor',
      'Guia de harmonização',
      'Embalagem premium colecionável',
    ],
  },

  barista: {

    nome: 'Barista',

    preco: 'R$ 89,90',

    descricao:
      'Plano mais popular para consumidores que desejam variedade, exclusividade e uma experiência premium completa.',

    beneficios: [
      '3 caixas mensais premium',
      'Cafés nacionais e internacionais',
      'Sistema fidelidade avançado',
      'Brindes exclusivos',
      'Conteúdo especial sobre preparo',
    ],

    experiencia:
      'Uma experiência completa para quem deseja aprofundar o conhecimento em cafés especiais e explorar sabores exclusivos.',

    inclui: [
      '3 cafés premium diferentes',
      'Brindes colecionáveis',
      'Mini guia de preparo',
      'Acesso antecipado a lançamentos',
    ],
  },

  'nômade-premium': {

    nome: 'Nômade Premium',

    preco: 'R$ 899,90/ano',

    descricao:
      'Experiência definitiva para apaixonados por cafés raros, exclusivos e colecionáveis.',

    beneficios: [
      'Edições limitadas',
      'Microlotes exclusivos',
      'Entrega prioritária',
      'Produtos exclusivos',
      'Experiências sensoriais premium',
    ],

    experiencia:
      'Criado para consumidores exigentes que desejam acesso a cafés raros, experiências exclusivas e coleções limitadas.',

    inclui: [
      'Microlotes internacionais',
      'Kit premium exclusivo',
      'Copo térmico personalizado',
      'Acesso VIP aos lançamentos',
    ],
  },
}

export default function PlanoDetalhes() {

  const { id } = useParams()

  const plano = planos[id]

  if (!plano) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2eb] dark:bg-[#181411] text-[#2d1f16] dark:text-white">

        <h1 className="text-4xl font-bold">
          Plano não encontrado
        </h1>

      </main>
    )
  }

  return (

    <main className="bg-[#f7f2eb] dark:bg-[#181411] min-h-screen py-24 px-5 md:px-10 transition duration-500 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* TEXTO */}

          <div>

            <p className="uppercase tracking-[6px] text-[#8b5e3c] dark:text-[#d8b08c] mb-6 font-semibold text-sm">

              Plano Exclusivo

            </p>

            <h1 className="text-5xl md:text-7xl font-bold text-[#2d1f16] dark:text-white leading-tight mb-8">

              {plano.nome}

            </h1>

            <p className="text-4xl font-bold text-[#8b5e3c] mb-8">

              {plano.preco}

            </p>

            <p className="text-lg md:text-xl text-[#4b382d] dark:text-gray-300 leading-relaxed mb-10">

              {plano.descricao}

            </p>

            <Link
              to="/checkout"
              state={{
                planoId: id,
                planoNome: plano.nome,
                planoPreco: plano.preco,
                planoDescricao: plano.descricao
              }}
            >

              <button className="bg-[#2d1f16] hover:bg-[#442f22] text-white px-10 py-5 rounded-2xl text-lg transition hover:scale-105 shadow-xl">

                Assinar Plano

              </button>

            </Link>

          </div>

          {/* MOCKUP */}

          <div className="relative">

            <div className="bg-[#d8c2aa] dark:bg-[#3a2a1f] h-[500px] rounded-[40px] shadow-2xl flex items-center justify-center">

              <p className="text-2xl md:text-3xl text-[#2d1f16] dark:text-white font-semibold text-center px-10">

                Espaço para mockup da caixa do plano

              </p>

            </div>

            {/* CARD FLUTUANTE */}

            <div className="absolute -bottom-8 -left-4 md:left-[-40px] bg-white dark:bg-[#241912] p-6 rounded-3xl shadow-2xl w-[280px]">

              <h3 className="text-2xl font-bold text-[#2d1f16] dark:text-white mb-3">

                Experiência Premium

              </h3>

              <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">

                Cafés selecionados, experiências exclusivas e embalagens premium.

              </p>

            </div>

          </div>

        </div>

        {/* BENEFÍCIOS */}

        <section className="mb-24">

          <h2 className="text-4xl font-bold text-[#2d1f16] dark:text-white mb-12">

            Benefícios do Plano

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {plano.beneficios.map((beneficio, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#241912] p-8 rounded-[30px] shadow-xl"
              >

                <p className="text-lg text-[#4b382d] dark:text-gray-300 leading-relaxed">

                  {beneficio}

                </p>

              </div>

            ))}

          </div>

        </section>

        {/* O QUE VEM */}

        <section className="mb-24">

          <h2 className="text-4xl font-bold text-[#2d1f16] dark:text-white mb-12">

            O que vem na caixa?

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {plano.inclui.map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#241912] p-8 rounded-[30px] shadow-xl text-center"
              >

                <div className="bg-[#f7f2eb] dark:bg-[#3a2a1f] h-32 rounded-2xl mb-6 flex items-center justify-center">

                  <p className="text-[#2d1f16] dark:text-white font-semibold">
                    Imagem
                  </p>

                </div>

                <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">

                  {item}

                </p>

              </div>

            ))}

          </div>

        </section>

        {/* EXPERIÊNCIA */}

        <section className="bg-white dark:bg-[#241912] rounded-[40px] p-10 md:p-16 shadow-2xl">

          <h2 className="text-4xl font-bold text-[#2d1f16] dark:text-white mb-10">

            Experiência Sensorial

          </h2>

          <p className="text-lg md:text-xl text-[#4b382d] dark:text-gray-300 leading-relaxed max-w-4xl">

            {plano.experiencia}

          </p>

        </section>

      </div>

    </main>
  )
}