import { Link } from 'react-router-dom'

const planos = [

  {
    nome: 'Explorador',
    preco: 'R$ 49,90',
    descricao:
      'Ideal para quem deseja iniciar no universo dos cafés especiais com praticidade e experiências únicas.',

    beneficios: [
      '1 caixa mensal com cafés selecionados',
      'Cafés especiais nacionais',
      'Guia de degustação exclusivo',
      'Acesso à comunidade Grão Nômade',
    ],

    destaque: false,
  },

  {
    nome: 'Barista',
    preco: 'R$ 89,90',
    descricao:
      'Plano mais popular para consumidores que desejam variedade, exclusividade e experiência premium completa.',

    beneficios: [
      '3 caixas mensais premium',
      'Cafés nacionais e internacionais',
      'Sistema de fidelidade',
      'Brindes sazonais exclusivos',
      'Conteúdo especial sobre preparo',
    ],

    destaque: true,
  },

  {
    nome: 'Nômade Premium',
    preco: 'R$ 899,90/ano',
    descricao:
      'Experiência definitiva para apaixonados por cafés raros, exclusivos e colecionáveis.',

    beneficios: [
      'Edições limitadas',
      'Microlotes exclusivos',
      'Brindes premium',
      'Acesso antecipado',
      'Experiências exclusivas',
    ],

    destaque: false,
  },
]

export default function Planos() {

  return (

    <main className="bg-[#f7f2eb] dark:bg-[#181411] min-h-screen py-24 px-5 md:px-10 transition duration-500 overflow-hidden">

      <div className="max-w-7xl mx-auto">

        {/* TOPO */}

        <div className="text-center mb-24">

          <p className="uppercase tracking-[6px] text-[#8b5e3c] dark:text-[#d8b08c] mb-6 font-semibold text-sm">

            Assinaturas

          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2d1f16] dark:text-white mb-8 leading-tight">

            Escolha sua experiência ideal

          </h1>

          <p className="text-lg md:text-xl text-[#4b382d] dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">

            Planos desenvolvidos para diferentes perfis de consumidores,
            desde iniciantes até apreciadores avançados de cafés especiais.

          </p>

        </div>

        {/* CARDS */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {planos.map((plano, index) => (

            <div
              key={index}
              className={`relative rounded-[40px] p-10 shadow-2xl transition duration-500 hover:-translate-y-3 overflow-hidden
              
              ${plano.destaque
                ? 'bg-[#2d1f16] text-white scale-[1.03]'
                : 'bg-white dark:bg-[#241912]'
              }`}
            >

              {/* SELO */}

              {plano.destaque && (

                <div className="absolute top-6 right-6 bg-[#d8b08c] text-[#2d1f16] px-5 py-2 rounded-full text-sm font-bold shadow-lg">

                  Mais Popular

                </div>

              )}

              {/* MOCKUP IMAGEM */}

              <div className={`h-[220px] rounded-[30px] mb-10 flex items-center justify-center
              
              ${plano.destaque
                ? 'bg-[#4b382d]'
                : 'bg-[#f7f2eb] dark:bg-[#3a2a1f]'
              }`}>

                <p className={`text-center text-lg font-semibold px-6
                  
                  ${plano.destaque
                    ? 'text-white'
                    : 'text-[#2d1f16] dark:text-white'
                  }`}>

                  Espaço para imagem do plano

                </p>

              </div>

              {/* TÍTULO */}

              <h2 className={`text-4xl font-bold mb-6
              
              ${plano.destaque
                ? 'text-white'
                : 'text-[#2d1f16] dark:text-white'
              }`}>

                {plano.nome}

              </h2>

              {/* PREÇO */}

              <p className={`text-4xl font-bold mb-8
              
              ${plano.destaque
                ? 'text-[#d8b08c]'
                : 'text-[#8b5e3c]'
              }`}>

                {plano.preco}

              </p>

              {/* DESCRIÇÃO */}

              <p className={`leading-relaxed mb-10 text-lg
              
              ${plano.destaque
                ? 'text-gray-300'
                : 'text-[#4b382d] dark:text-gray-300'
              }`}>

                {plano.descricao}

              </p>

              {/* BENEFÍCIOS */}

              <div className="space-y-4 mb-12">

                {plano.beneficios.map((beneficio, i) => (

                  <div
                    key={i}
                    className={`p-4 rounded-2xl text-[15px]
                    
                    ${plano.destaque
                      ? 'bg-[#4b382d]'
                      : 'bg-[#f7f2eb] dark:bg-[#3a2a1f]'
                    }`}
                  >

                    {beneficio}

                  </div>

                ))}

              </div>

              {/* BOTÃO */}

              <Link
                to={`/planos/${plano.nome.toLowerCase().replace(' ', '-')}`}
              >

                <button className={`w-full py-5 rounded-2xl text-lg font-semibold transition hover:scale-[1.02]
                
                ${plano.destaque
                  ? 'bg-[#d8b08c] text-[#2d1f16] hover:bg-[#e8c7a7]'
                  : 'bg-[#2d1f16] text-white hover:bg-[#442f22]'
                }`}>

                  Conhecer Plano

                </button>

              </Link>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}