export default function Sobre() {
  return (
    <main className="bg-[#f7f2eb] min-h-screen">

      {/* HERO */}

      <section className="py-28 px-8">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>

            <p className="uppercase tracking-[6px] text-[#8b5e3c] mb-6 font-semibold">
              Nossa história
            </p>

            <h1 className="text-6xl font-bold text-[#2d1f16] leading-tight mb-8">
              Transformando café em experiência.
            </h1>

            <p className="text-xl text-[#4b382d] leading-relaxed">
              O Grão Nômade nasceu com a proposta de aproximar pessoas
              do universo dos cafés especiais através de uma experiência
              prática, moderna e personalizada.
            </p>

          </div>

          <div className="bg-[#d8c2aa] h-[500px] rounded-[40px] shadow-2xl flex items-center justify-center">

            <p className="text-2xl font-semibold text-[#2d1f16]">
              Espaço para imagem institucional
            </p>

          </div>

        </div>

      </section>

      {/* MISSÃO */}

      <section className="bg-white py-28 px-8">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-20 text-[#2d1f16]">
            Missão, visão e valores
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-[#f7f2eb] p-10 rounded-3xl shadow-xl">

              <h3 className="text-3xl font-bold mb-6">
                Missão
              </h3>

              <p className="text-[#4b382d] leading-relaxed">
                Oferecer experiências únicas através de cafés especiais,
                conectando pessoas a diferentes culturas produtoras.
              </p>

            </div>

            <div className="bg-[#f7f2eb] p-10 rounded-3xl shadow-xl">

              <h3 className="text-3xl font-bold mb-6">
                Visão
              </h3>

              <p className="text-[#4b382d] leading-relaxed">
                Ser referência nacional em experiências de assinatura
                de cafés premium e consumo personalizado.
              </p>

            </div>

            <div className="bg-[#f7f2eb] p-10 rounded-3xl shadow-xl">

              <h3 className="text-3xl font-bold mb-6">
                Valores
              </h3>

              <p className="text-[#4b382d] leading-relaxed">
                Qualidade, inovação, sustentabilidade e valorização
                dos produtores de café.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}