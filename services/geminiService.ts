
import { GoogleGenAI, Modality } from "@google/genai";
import { GenerationResult } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedData = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const generateRealisticPhoto = async (prompt: string, imageFile: File): Promise<GenerationResult[]> => {
    const imagePart = await fileToGenerativePart(imageFile);
    const textPart = { text: prompt };
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    const results: GenerationResult[] = [];
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            results.push({ type: 'image', url: imageUrl });
        }
    }
    return results;
};

export const generatePhotoshopImage = async (prompt: string, imageFile?: File): Promise<GenerationResult[]> => {
    if (imageFile) {
        // Image Editing
        const imagePart = await fileToGenerativePart(imageFile);
        const textPart = { text: prompt };
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const results: GenerationResult[] = [];
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                results.push({ type: 'image', url: imageUrl });
            }
        }
        return results;
    } else {
        // Image Generation
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/png',
              aspectRatio: '1:1',
            },
        });
        
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
        return [{ type: 'image', url: imageUrl }];
    }
};

export const generateVeoVideo = async (
    prompt: string, 
    imageFile?: File,
    onProgress?: (message: string) => void
): Promise<GenerationResult[]> => {
    onProgress?.("Initialisation de la génération de la vidéo...");

    let operation;
    if (imageFile) {
        const imagePart = await fileToGenerativePart(imageFile);
        operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            image: {
                imageBytes: imagePart.inlineData.data,
                mimeType: imagePart.inlineData.mimeType,
            },
            config: {
                numberOfVideos: 1
            }
        });
    } else {
        operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            config: {
                numberOfVideos: 1
            }
        });
    }
    
    onProgress?.("L'opération a commencé. La génération peut prendre plusieurs minutes. Veuillez patienter...");

    let pollCount = 0;
    while (!operation.done) {
        pollCount++;
        const progressMessages = [
            "Analyse du prompt...",
            "Préparation des ressources de calcul...",
            "Génération des premières images clés...",
            "Rendu de la séquence vidéo...",
            "Application des effets et finitions...",
            "Finalisation du fichier vidéo..."
        ];
        const message = progressMessages[pollCount % progressMessages.length];
        onProgress?.(`Étape ${pollCount}: ${message}`);

        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    if (!operation.response?.generatedVideos?.[0]?.video?.uri) {
        throw new Error("La génération de la vidéo a échoué ou l'URI est manquante.");
    }
    
    onProgress?.("Téléchargement de la vidéo finalisée...");
    const downloadLink = operation.response.generatedVideos[0].video.uri;
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);

    if (!response.ok) {
        throw new Error(`Échec du téléchargement de la vidéo: ${response.statusText}`);
    }

    const videoBlob = await response.blob();
    const videoUrl = URL.createObjectURL(videoBlob);
    
    onProgress?.("Génération terminée !");

    return [{ type: 'video', url: videoUrl }];
};
