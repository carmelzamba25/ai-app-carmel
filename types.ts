
export interface FormOption {
  nom: string;
  type: 'upload' | 'dropdown' | 'checkbox' | 'textarea' | 'number';
  required?: boolean;
  options?: string[];
  placeholder?: string;
  default?: number | string;
  max?: number;
}

export interface Service {
  nomService: string;
  description: string;
  optionsFormulaire: FormOption[];
  fonctionnalités: string[];
}

export type FormData = {
  [key: string]: string | string[] | File | number | boolean | undefined;
};

export interface ImageResult {
  type: 'image';
  url: string;
}

export interface VideoResult {
  type: 'video';
  url: string;
}

export type GenerationResult = ImageResult | VideoResult;
