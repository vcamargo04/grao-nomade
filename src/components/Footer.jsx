export default function Footer() {
  return (
    <footer className="bg-[#1c130d] text-gray-300 py-20 px-8">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">

        <div>

          <h2 className="text-3xl font-bold text-white mb-6">
            Grão Nômade
          </h2>

          <p className="leading-relaxed">
            Transformando o consumo de café em uma experiência premium,
            cultural e personalizada.
          </p>

        </div>

        <div>

          <h3 className="text-xl font-bold text-white mb-6">
            Navegação
          </h3>

          <div className="flex flex-col gap-4">

            <p>Início</p>
            <p>Sobre Nós</p>
            <p>Planos</p>
            <p>Entrar</p>

          </div>

        </div>

        <div>

          <h3 className="text-xl font-bold text-white mb-6">
            Contato
          </h3>

          <div className="flex flex-col gap-4">

            <p>graonomade@gmail.com</p>
            <p>(11) 99999-9999</p>
            <p>Segunda à Sexta</p>
            <p>08h às 18h</p>

          </div>

        </div>

        <div>

          <h3 className="text-xl font-bold text-white mb-6">
            Endereço
          </h3>

          <div className="flex flex-col gap-4">

            <p>Universidade Cruzeiro do Sul</p>
            <p>Campus Anália Franco</p>
            <p>São Paulo - SP</p>
            <p>CEP: 03340-000</p>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 mt-16 pt-8 text-center">

        <p>
          © 2026 Grão Nômade — Todos os direitos reservados.
        </p>

      </div>

    </footer>
  )
}