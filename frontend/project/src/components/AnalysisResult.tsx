import React from 'react';
import { ArrowLeft, Droplets, Layers, Leaf, Sun, Lightbulb } from 'lucide-react';
import type { SoilAnalysis } from '../App';

interface Props {
  image: string;
  analysis: SoilAnalysis;
  onNewAnalysis: () => void;
  onBackToHome: () => void;
}

const AnalysisResult: React.FC<Props> = ({ image, analysis, onNewAnalysis, onBackToHome }) => {
  const getFertilityColor = (fertility: string) => {
    switch (fertility) {
      case 'alto': return 'text-green-600';
      case 'médio': return 'text-yellow-600';
      case 'baixo': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getMoistureColor = (moisture: string) => {
    switch (moisture) {
      case 'encharcado': return 'text-blue-600';
      case 'úmido': return 'text-green-600';
      case 'seco': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTextureIcon = (texture: string) => {
    switch (texture) {
      case 'arenoso': return '🏖️';
      case 'argiloso': return '🏺';
      case 'siltoso': return '🌾';
      default: return '🌍';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={onBackToHome} 
        className="mb-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </button>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Resultado da Análise</h1>
      
      {/* Imagem do solo */}
      <div className="mb-8">
        <img src={image} alt="Solo analisado" className="w-full max-w-2xl mx-auto rounded-xl shadow-lg" />
      </div>

      {/* Resultados principais */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-green-600" />
            Classificação Principal
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700 font-semibold">Tipo de Solo:</span>
              <span className="text-lg font-bold text-gray-900">{analysis.soilType}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700 font-semibold">Confiança:</span>
              <span className="text-lg font-bold text-green-600">{analysis.confidence}%</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700 font-semibold">Cor Dominante:</span>
              <span className="text-lg font-bold text-gray-900">{analysis.dominantColor}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-blue-600" />
            Características Físicas
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700 font-semibold">Textura:</span>
              <span className="text-lg font-bold text-gray-900 flex items-center">
                {getTextureIcon(analysis.texture)} {analysis.texture}
              </span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-700 font-semibold">Umidade:</span>
              <span className={`text-lg font-bold flex items-center ${getMoistureColor(analysis.moisture)}`}>
                <Droplets className="w-4 h-4 mr-1" />
                {analysis.moisture}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Características químicas */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Sun className="w-5 h-5 mr-2 text-yellow-600" />
            Fertilidade
          </h3>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-700 font-semibold">Nível de Fertilidade:</span>
            <span className={`text-lg font-bold ${getFertilityColor(analysis.fertility)}`}>
              {analysis.fertility}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-green-600" />
            Matéria Orgânica
          </h3>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-700 font-semibold">Conteúdo Orgânico:</span>
            <span className={`text-lg font-bold ${getFertilityColor(analysis.organicMatter)}`}>
              {analysis.organicMatter}
            </span>
          </div>
        </div>
      </div>

      {/* Sugestões */}
      {analysis.suggestions && analysis.suggestions.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
            Sugestões e Recomendações
          </h3>
          <div className="space-y-3">
            {analysis.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start bg-yellow-50 p-3 rounded-lg">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <p className="text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onNewAnalysis}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
        >
          Nova Análise
        </button>
        <button
          onClick={onBackToHome}
          className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
