import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <main className="bg-[#f7f2eb] dark:bg-[#181411] min-h-screen transition duration-500">

      {/* HERO */}

      <section className="min-h-[90vh] flex items-center px-5 md:px-10 py-20">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* TEXTO */}

          <div>

            <p className="uppercase tracking-[6px] text-[#8b5e3c] dark:text-[#d8b08c] mb-6 font-semibold text-sm">
              Clube de cafés especiais
            </p>

            <h1 className="text-5xl md:text-7xl font-bold text-[#2d1f16] dark:text-white leading-tight mb-8">

              Transformando café em experiência.

            </h1>

            <p className="text-lg md:text-xl text-[#4b382d] dark:text-gray-300 leading-relaxed mb-10 max-w-2xl">

              Descubra cafés exclusivos, sabores únicos e experiências
              premium entregues mensalmente na sua casa.

            </p>

            {/* BOTÕES */}

            <div className="flex flex-col sm:flex-row gap-5">

              <Link to="/planos">

                <button className="bg-[#2d1f16] hover:bg-[#442f22] text-white px-10 py-5 rounded-2xl text-lg transition hover:scale-105 shadow-xl">

                  Assinar Agora

                </button>

              </Link>

              <Link to="/planos">

                <button className="border-2 border-[#2d1f16] dark:border-white text-[#2d1f16] dark:text-white px-10 py-5 rounded-2xl text-lg hover:bg-[#2d1f16] hover:text-white transition">

                  Conhecer Planos

                </button>

              </Link>

            </div>

          </div>

          {/* IMAGEM */}

          <div className="relative">

            <div className="bg-[#d8c2aa] dark:bg-[#3a2a1f] h-[500px] md:h-[650px] rounded-[40px] shadow-2xl flex items-center justify-center">

              <p className="text-2xl md:text-3xl text-[#2d1f16] dark:text-white font-semibold text-center px-10">

                Espaço para imagem principal do projeto

              </p>

            </div>

            {/* CARD FLUTUANTE */}

            <div className="absolute -bottom-8 -left-4 md:left-[-40px] bg-white dark:bg-[#241912] p-6 rounded-3xl shadow-2xl w-[280px]">

              <h3 className="text-2xl font-bold text-[#2d1f16] dark:text-white mb-3">
                +5.000 assinantes
              </h3>

              <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                Consumidores apaixonados por cafés especiais e experiências premium.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* BENEFÍCIOS */}

      <section className="py-24 px-5 md:px-10">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <p className="uppercase tracking-[6px] text-[#8b5e3c] dark:text-[#d8b08c] mb-6 font-semibold text-sm">
              Benefícios
            </p>

            <h2 className="text-4xl md:text-6xl font-bold text-[#2d1f16] dark:text-white mb-8">
              Por que escolher o Grão Nômade?
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-white dark:bg-[#241912] p-10 rounded-[35px] shadow-2xl hover:-translate-y-2 transition">

              <div className="bg-[#f7f2eb] dark:bg-[#3a2a1f] w-20 h-20 rounded-3xl mb-8"></div>

              <h3 className="text-3xl font-bold text-[#2d1f16] dark:text-white mb-6">
                Cafés exclusivos
              </h3>

              <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                Selecionamos cafés especiais nacionais e internacionais
                com qualidade premium e sabores únicos.
              </p>

            </div>

            <div className="bg-white dark:bg-[#241912] p-10 rounded-[35px] shadow-2xl hover:-translate-y-2 transition">

              <div className="bg-[#f7f2eb] dark:bg-[#3a2a1f] w-20 h-20 rounded-3xl mb-8"></div>

              <h3 className="text-3xl font-bold text-[#2d1f16] dark:text-white mb-6">
                Entrega mensal
              </h3>

              <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                Receba mensalmente uma experiência completa diretamente
                na sua casa com praticidade.
              </p>

            </div>

            <div className="bg-white dark:bg-[#241912] p-10 rounded-[35px] shadow-2xl hover:-translate-y-2 transition">

              <div className="bg-[#f7f2eb] dark:bg-[#3a2a1f] w-20 h-20 rounded-3xl mb-8"></div>

              <h3 className="text-3xl font-bold text-[#2d1f16] dark:text-white mb-6">
                Experiência premium
              </h3>

              <p className="text-[#4b382d] dark:text-gray-300 leading-relaxed">
                Muito além do café: uma experiência sensorial,
                cultural e colecionável.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}