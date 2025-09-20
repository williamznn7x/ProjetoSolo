import React, { useState, useRef } from 'react';
import { Upload, ArrowLeft, Image, AlertCircle } from 'lucide-react';
import { analyzeSoilAPI } from '../utils/soilAnalyzer';
import type { SoilAnalysis } from '../App';

interface UploadFormProps {
  onImageUploaded: (imageUrl: string, analysis: SoilAnalysis) => void;
  onBack: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onImageUploaded, onBack }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validação do tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem (JPG, PNG).');
      return;
    }

    // Validação do tamanho (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 10MB.');
      return;
    }

    setIsAnalyzing(true);

    try {
      // Envia a imagem para o backend
      const analysis = await analyzeSoilAPI(file);
      const imageUrl = URL.createObjectURL(file);
      onImageUploaded(imageUrl, analysis);
    } catch (err: any) {
      setError(err.message || 'Erro ao analisar a imagem.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (isAnalyzing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Analisando seu solo...</h2>
          <p className="text-gray-600">
            Nossa IA está processando a imagem e identificando as características do solo. Isso pode levar alguns segundos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Voltar
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Enviar Imagem do Solo</h1>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Dicas para melhor análise:</h3>
        <ul className="text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Tire a foto em boa iluminação natural
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Remova folhas, pedras ou outros detritos
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Fotografe uma área representativa do solo
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Use formatos JPG ou PNG (máximo 10MB)
          </li>
        </ul>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragging
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Arraste sua imagem aqui
          </h3>
          <p className="text-gray-600 mb-6">
            ou clique no botão abaixo para selecionar
          </p>

          <button
            onClick={handleUploadClick}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Upload className="w-5 h-5 inline mr-2" />
            Selecionar Arquivo
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
