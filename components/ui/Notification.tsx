
import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "flex items-center justify-between w-full p-4 rounded-lg shadow-lg text-white";
  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
        <CloseIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
