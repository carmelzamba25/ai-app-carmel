
import React from 'react';
import { GenerationResult } from '../types';
import { DownloadIcon, ImageIcon } from './ui/Icons';

interface ResultDisplayProps {
  results: GenerationResult[];
}

const ResultCard: React.FC<{ result: GenerationResult }> = ({ result }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = result.url;
        const fileExtension = result.type === 'image' ? 'png' : 'mp4';
        link.download = `luxia-studio-result-${Date.now()}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="group relative overflow-hidden rounded-lg bg-gray-900 border border-gray-800 aspect-square">
            {result.type === 'image' && (
                <img src={result.url} alt="Résultat de la génération" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            )}
            {result.type === 'video' && (
                <video src={result.url} controls className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-[#FFD700] text-black font-bold py-2 px-4 rounded-full hover:bg-[#e6c200] transition-colors duration-300 transform scale-90 group-hover:scale-100"
                >
                    <DownloadIcon className="w-5 h-5" />
                    Télécharger
                </button>
            </div>
        </div>
    );
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-900/50 p-8 rounded-xl border border-dashed border-gray-700 min-h-[300px] lg:min-h-full">
        <ImageIcon className="w-16 h-16 text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300">Zone de résultat</h3>
        <p className="text-gray-500 mt-2 text-center">Les images ou vidéos générées apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white">Résultats de la génération</h3>
        <div className="grid grid-cols-1 gap-6">
            {results.map((result, index) => (
                <ResultCard key={index} result={result} />
            ))}
        </div>
    </div>
  );
};
