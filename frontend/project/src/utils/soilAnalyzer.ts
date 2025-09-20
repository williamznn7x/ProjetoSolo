// src/utils/soilAnalyzer.ts
import type { SoilAnalysis } from '../App';

/**
 * Envia a imagem para o backend e retorna a análise do solo.
 * @param file - arquivo de imagem selecionado
 * @returns SoilAnalysis
 */
export async function analyzeSoilAPI(file: File): Promise<SoilAnalysis> {
  const formData = new FormData();
  formData.append('file', file); // 'file' deve ser igual ao que o Flask espera

  try {
    const response = await fetch('http://localhost:5000/analyze', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Erro na análise: ${text || response.statusText}`);
    }

    const data: SoilAnalysis = await response.json();
    return data;
  } catch (err: any) {
    throw new Error(err.message || 'Erro ao conectar com o backend');
  }
}
