
import React, { useState, useCallback, useMemo } from 'react';
import { Service, FormData, GenerationResult } from '../types';
import { generateRealisticPhoto, generatePhotoshopImage, generateVeoVideo } from '../services/geminiService';
import { Button, FileUpload, Select, CheckboxGroup, Textarea, NumberInput } from './ui/FormControls';
import { ResultDisplay } from './ResultDisplay';
import { Spinner } from './ui/Spinner';
import { Notification } from './ui/Notification';

interface ServiceContainerProps {
  service: Service;
}

export const ServiceContainer: React.FC<ServiceContainerProps> = ({ service }) => {
  const initialFormData = useMemo(() => {
    const data: FormData = {};
    service.optionsFormulaire.forEach(opt => {
      if (opt.type === 'checkbox') {
        data[opt.nom] = [];
      } else if (opt.default) {
        data[opt.nom] = opt.default;
      } else {
        data[opt.nom] = undefined;
      }
    });
    return data;
  }, [service]);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GenerationResult[]>([]);

  const handleFormChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const constructPrompt = () => {
      let prompt = "";
      for (const [key, value] of Object.entries(formData)) {
          if (value && key !== 'Image de référence' && key !== 'Image de référence (optionnelle)' && key !== 'Commentaires supplémentaires' && key !== "Champ de description") {
              if (Array.isArray(value) && value.length > 0) {
                  prompt += `${key}: ${value.join(', ')}. `;
              } else if (!Array.isArray(value)) {
                  prompt += `${key}: ${value}. `;
              }
          }
      }
      prompt += formData["Champ de description"] || "";
      prompt += formData["Commentaires supplémentaires"] ? `\n\nInstructions supplémentaires: ${formData["Commentaires supplémentaires"]}` : "";
      return prompt.trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredField = service.optionsFormulaire.find(opt => opt.required);
    if (requiredField && !formData[requiredField.nom]) {
      setError(`Le champ "${requiredField.nom}" est obligatoire.`);
      return;
    }

    setLoading(true);
    setLoadingMessage('Préparation de la génération...');
    setError(null);
    setResults([]);

    try {
      const prompt = constructPrompt();
      let newResults: GenerationResult[] = [];

      switch (service.nomService) {
        case "Photographie Shooting UltraRéaliste":
          const photoFile = formData['Image de référence'] as File;
          newResults = await generateRealisticPhoto(prompt, photoFile);
          break;
        case "Générateur d'Image Photoshop":
          const psFile = formData['Image de référence (optionnelle)'] as File | undefined;
          newResults = await generatePhotoshopImage(prompt, psFile);
          break;
        case "Générateur Vidéo VEO IA":
          const videoFile = formData['Image de référence (optionnelle)'] as File | undefined;
          newResults = await generateVeoVideo(prompt, videoFile, setLoadingMessage);
          break;
      }
      setResults(newResults);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue.");
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <div className="space-y-8">
       {error && <Notification message={error} type="error" onClose={() => setError(null)} />}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="bg-gray-900/50 p-6 sm:p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-semibold text-white mb-2">{service.nomService}</h2>
          <p className="text-gray-400 mb-6">{service.description}</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {service.optionsFormulaire.map(opt => {
              switch (opt.type) {
                case 'upload':
                  return <FileUpload key={opt.nom} label={opt.nom} required={opt.required} onChange={file => handleFormChange(opt.nom, file)} />;
                case 'dropdown':
                  return <Select key={opt.nom} label={opt.nom} options={opt.options || []} onChange={value => handleFormChange(opt.nom, value)} />;
                case 'checkbox':
                  return <CheckboxGroup key={opt.nom} label={opt.nom} options={opt.options || []} onChange={values => handleFormChange(opt.nom, values)} />;
                case 'textarea':
                  return <Textarea key={opt.nom} label={opt.nom} required={opt.required} placeholder={opt.placeholder} onChange={value => handleFormChange(opt.nom, value)} />;
                case 'number':
                    return <NumberInput key={opt.nom} label={opt.nom} defaultValue={opt.default as number} max={opt.max} onChange={value => handleFormChange(opt.nom, value)} />;
                default:
                  return null;
              }
            })}
             <div className="pt-4">
               <Button type="submit" disabled={loading}>
                 {loading ? 'Génération en cours...' : 'Générer'}
               </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 lg:mt-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full bg-gray-900/50 p-8 rounded-xl border border-dashed border-gray-700">
              <Spinner />
              <p className="mt-4 text-lg text-[#FFD700]">{loadingMessage || 'Génération en cours...'}</p>
              <p className="mt-2 text-sm text-gray-400 text-center">Cela peut prendre un certain temps. Merci de votre patience.</p>
            </div>
          ) : (
            <ResultDisplay results={results} />
          )}
        </div>
      </div>
    </div>
  );
};
