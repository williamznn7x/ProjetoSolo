import React from 'react';
import { Leaf, Droplets, Recycle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="w-8 h-8 mr-2" />
              <h3 className="text-xl font-bold">SoloAnalyze</h3>
            </div>
            <p className="text-green-200 leading-relaxed">
              Tecnologia a serviço da agricultura sustentável. 
              Ajudamos você a entender melhor seu solo para cultivos mais produtivos.
            </p>
          </div>

          {/* Soil Education */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              Educação sobre Solos
            </h4>
            <ul className="space-y-2 text-green-200">
              <li>• Solo é um recurso não renovável</li>
              <li>• Leva centenas de anos para se formar</li>
              <li>• Base da produção de alimentos</li>
              <li>• Abriga 25% da biodiversidade</li>
              <li>• Filtra e purifica a água</li>
            </ul>
          </div>

          {/* Conservation Tips */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <Droplets className="w-5 h-5 mr-2" />
              Dicas de Conservação
            </h4>
            <ul className="space-y-2 text-green-200">
              <li>• Evite compactação do solo</li>
              <li>• Use cobertura vegetal</li>
              <li>• Pratique rotação de culturas</li>
              <li>• Controle a erosão</li>
              <li>• Mantenha a matéria orgânica</li>
            </ul>
          </div>

          {/* Best Practices */}
          <div>
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <Recycle className="w-5 h-5 mr-2" />
              Boas Práticas
            </h4>
            <ul className="space-y-2 text-green-200">
              <li>• Compostagem orgânica</li>
              <li>• Irrigação eficiente</li>
              <li>• Análises periódicas</li>
              <li>• Uso consciente de fertilizantes</li>
              <li>• Plantio direto</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-700 mt-8 pt-8 text-center">
          <p className="text-green-200 mb-2">
            © 2025 SoloAnalyze. Desenvolvido com ❤️ para a agricultura sustentável.
          </p>
          <p className="text-green-300 text-sm">
            Este projeto tem fins educativos. Para análises profissionais, consulte especialistas.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;