import React, { useState } from 'react';
import HomePage from './components/HomePage';
import UploadForm from './components/UploadForm';
import AnalysisResult from './components/AnalysisResult';
import Footer from './components/Footer';

export interface SoilAnalysis {
  dominantColor: string;
  texture: 'arenoso' | 'argiloso' | 'siltoso';
  moisture: 'seco' | 'úmido' | 'encharcado';
  fertility: 'alto' | 'médio' | 'baixo';
  organicMatter: 'alto' | 'médio' | 'baixo';
  suggestions: string[];
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'upload' | 'result'>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<SoilAnalysis | null>(null);

  const handleStartAnalysis = () => {
    setCurrentPage('upload');
  };

  const handleImageUploaded = (imageUrl: string, analysisResult: SoilAnalysis) => {
    setUploadedImage(imageUrl);
    setAnalysis(analysisResult);
    setCurrentPage('result');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setUploadedImage(null);
    setAnalysis(null);
  };

  const handleNewAnalysis = () => {
    setCurrentPage('upload');
    setUploadedImage(null);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex flex-col">
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onStartAnalysis={handleStartAnalysis} />
        )}
        {currentPage === 'upload' && (
          <UploadForm 
            onImageUploaded={handleImageUploaded}
            onBack={handleBackToHome}
          />
        )}
        {currentPage === 'result' && uploadedImage && analysis && (
          <AnalysisResult
            image={uploadedImage}
            analysis={analysis}
            onNewAnalysis={handleNewAnalysis}
            onBackToHome={handleBackToHome}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;