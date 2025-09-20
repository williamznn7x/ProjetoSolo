import React from 'react';
import { Leaf, Search, BarChart3, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onStartAnalysis: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartAnalysis }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="w-12 h-12 text-green-600 mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Terra<span className="text-green-600">Sense</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Descubra as características do seu solo através de análise por imagem
        </p>
      </header>

      {/* What is Soil Analysis */}
      <section className="mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            O que é Análise de Solo?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                A análise de solo é um processo fundamental para a agricultura que permite
                identificar as características físicas e químicas do solo, determinando
                sua adequação para diferentes cultivos.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Com nossa ferramenta, você pode obter informações básicas sobre seu solo
                simplesmente enviando uma foto. É prático, rápido e acessível!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-100 p-4 rounded-xl text-center">
                <Search className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Análise Visual</p>
              </div>
              <div className="bg-amber-100 p-4 rounded-xl text-center">
                <BarChart3 className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="font-semibold text-gray-800">Resultados Rápidos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          O que analisamos
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Cor do Solo</h3>
            <p className="text-gray-600">
              Identificamos a cor predominante do solo, que indica composição mineral
              e presença de matéria orgânica.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-green-600 rounded-sm"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Textura</h3>
            <p className="text-gray-600">
              Determinamos se o solo é arenoso, argiloso ou siltoso, 
              informação crucial para irrigação e cultivo.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-blue-600 rounded-full opacity-70"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Umidade</h3>
            <p className="text-gray-600">
              Avaliamos o nível de umidade do solo para orientar
              sobre necessidades de irrigação.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Fertilidade</h3>
            <p className="text-gray-600">
              Analisamos o potencial de fertilidade do solo baseado
              em características visuais e cor.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Matéria Orgânica</h3>
            <p className="text-gray-600">
              Estimamos o conteúdo de matéria orgânica presente
              no solo através de análise de cor.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Recomendações</h3>
            <p className="text-gray-600">
              Fornecemos sugestões personalizadas de cultivo
              e manejo baseadas na análise completa.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Como funciona
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tire uma Foto</h3>
            <p className="text-gray-600">
              Fotografe uma amostra de solo em boa iluminação
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Envie a Imagem</h3>
            <p className="text-gray-600">
              Faça upload da foto nos formatos JPG ou PNG
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Análise Automática</h3>
            <p className="text-gray-600">
              Nossa IA analisa as características visuais do solo
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Receba Resultados</h3>
            <p className="text-gray-600">
              Obtenha análise detalhada e sugestões de cultivo
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para analisar seu solo?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece agora mesmo e descubra o potencial da sua terra!
          </p>
          <button
            onClick={onStartAnalysis}
            className="bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <CheckCircle className="w-6 h-6 inline mr-2" />
            Começar Análise
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;