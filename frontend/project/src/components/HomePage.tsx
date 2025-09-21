import React from 'react';
import { Leaf, Search, BarChart3, CheckCircle, Droplets, Zap, TreePine, Lightbulb, Palette, Layers, Sprout, Microscope, Users } from 'lucide-react';

interface HomePageProps {
  onStartAnalysis: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartAnalysis }) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Leaf className="w-12 h-12 text-green-600 dark:text-green-400 mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Terra<span className="text-green-600 dark:text-green-400">Sense</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Descubra as características do seu solo através de análise por imagem
        </p>
      </header>

      {/* Project Overview */}
      <section className="mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 transition-colors duration-300">
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 text-center">
            Visão Geral do Projeto
          </h2>
          <div className="w-16 h-1 bg-green-600 dark:bg-green-400 mx-auto mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                Democratizando a Análise de Solo
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                O TerraSense é um sistema inovador que utiliza Inteligência Artificial para tornar a análise de solo mais acessível, rápida e precisa. Nossa missão é democratizar o acesso a informações de qualidade sobre o solo, beneficiando desde pequenos agricultores até grandes empresas do agronegócio.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Através de algoritmos avançados de machine learning, o sistema analisa imagens do solo e fornece relatórios completos sobre suas características físicas e químicas, oferecendo recomendações personalizadas para otimizar o uso da terra.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Leaf className="w-8 h-8 text-green-800" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Sustentável</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Microscope className="w-8 h-8 text-green-800" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Preciso</h3>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-8 h-8 text-green-800" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Acessível</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          O que analisamos
        </h2>
        
        {/* First row - Cor do Solo and Textura */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <Palette className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Cor do Solo</h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Identificamos a cor predominante do solo, que indica composição mineral
              e presença de matéria orgânica.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <Layers className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Textura</h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Determinamos se o solo é arenoso, argiloso ou siltoso, 
              informação crucial para irrigação e cultivo.
            </p>
          </div>
        </div>

        {/* Second row - Umidade and Fertilidade */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <Droplets className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Umidade</h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Avaliamos o nível de umidade do solo para orientar
              sobre necessidades de irrigação.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <Sprout className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Fertilidade</h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Analisamos o potencial de fertilidade do solo baseado
              em características visuais e cor.
            </p>
          </div>
        </div>

        {/* Third row - Matéria Orgânica and Recomendações */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <TreePine className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Matéria Orgânica</h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Estimamos o conteúdo de matéria orgânica presente
              no solo através de análise de cor.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <Lightbulb className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Recomendações</h3>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Fornecemos sugestões personalizadas de cultivo
              e manejo baseadas na análise completa.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Como funciona
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 rounded-xl">
            <div className="w-16 h-16 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Tire uma Foto</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Fotografe uma amostra de solo em boa iluminação
            </p>
          </div>
          
          <div className="text-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 rounded-xl">
            <div className="w-16 h-16 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Envie a Imagem</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Faça upload da foto nos formatos JPG ou PNG
            </p>
          </div>
          
          <div className="text-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 rounded-xl">
            <div className="w-16 h-16 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Análise Automática</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nossa IA analisa as características visuais do solo
            </p>
          </div>
          
          <div className="text-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 rounded-xl">
            <div className="w-16 h-16 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Receba Resultados</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Obtenha análise detalhada e sugestões de cultivo
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="bg-gradient-to-r from-green-600 to-green-700 dark:from-green-700 dark:to-green-800 rounded-2xl p-8 md:p-12 text-white transition-colors duration-300">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para analisar seu solo?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Comece agora mesmo e descubra o potencial da sua terra!
          </p>
          <button
            onClick={onStartAnalysis}
            className="bg-white dark:bg-gray-100 text-green-600 dark:text-green-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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