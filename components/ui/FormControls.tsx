
import React, { useState } from 'react';
import { UploadIcon } from './Icons';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-[#FFD700] text-black font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#e6c200] transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-[#FFD700]"
    >
      {children}
    </button>
  );
};

const baseInputStyles = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] transition-colors";
const labelStyles = "block text-sm font-medium text-gray-300 mb-2";

// --- FileUpload ---
interface FileUploadProps {
  label: string;
  required?: boolean;
  onChange: (file: File | null) => void;
}
export const FileUpload: React.FC<FileUploadProps> = ({ label, required, onChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const id = `file-upload-${label.replace(/\s+/g, '-')}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName(file ? file.name : null);
    onChange(file);
  };
  
  return (
    <div>
      <label htmlFor={id} className={labelStyles}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <label htmlFor={id} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md cursor-pointer hover:border-[#FFD700] transition-colors">
        <div className="space-y-1 text-center">
          <UploadIcon className="mx-auto h-12 w-12 text-gray-500"/>
          <div className="flex text-sm text-gray-400">
            <span className="relative font-medium text-[#FFD700] hover:text-[#e6c200]">
              Cliquez pour choisir un fichier
            </span>
          </div>
          <p className="text-xs text-gray-500">{fileName || 'PNG, JPG, etc.'}</p>
        </div>
        <input id={id} name={id} type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
      </label>
    </div>
  );
};

// --- Select ---
interface SelectProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}
export const Select: React.FC<SelectProps> = ({ label, options, onChange }) => {
  return (
    <div>
      <label className={labelStyles}>{label}</label>
      <select onChange={(e) => onChange(e.target.value)} className={baseInputStyles}>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
};

// --- CheckboxGroup ---
interface CheckboxGroupProps {
  label: string;
  options: string[];
  onChange: (selected: string[]) => void;
}
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, onChange }) => {
    const [selected, setSelected] = useState<string[]>([]);
    
    const handleChange = (option: string) => {
        const newSelected = selected.includes(option)
            ? selected.filter(item => item !== option)
            : [...selected, option];
        setSelected(newSelected);
        onChange(newSelected);
    };

    return (
        <div>
            <label className={labelStyles}>{label}</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
                {options.map(opt => (
                    <label key={opt} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg border border-gray-700 cursor-pointer hover:border-[#FFD700] transition-colors">
                        <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#FFD700] focus:ring-[#FFD700] focus:ring-offset-gray-800"
                            checked={selected.includes(opt)}
                            onChange={() => handleChange(opt)}
                        />
                        <span className="text-sm text-gray-300">{opt}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

// --- Textarea ---
interface TextareaProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
}
export const Textarea: React.FC<TextareaProps> = ({ label, placeholder, required, onChange }) => (
  <div>
    <label className={labelStyles}>{label} {required && <span className="text-red-500">*</span>}</label>
    <textarea rows={4} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={baseInputStyles}></textarea>
  </div>
);

// --- NumberInput ---
interface NumberInputProps {
  label: string;
  defaultValue?: number;
  max?: number;
  onChange: (value: number) => void;
}
export const NumberInput: React.FC<NumberInputProps> = ({ label, defaultValue, max, onChange }) => (
    <div>
        <label className={labelStyles}>{label}</label>
        <input 
          type="number"
          defaultValue={defaultValue}
          max={max}
          min="1"
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className={baseInputStyles}
        />
    </div>
);
