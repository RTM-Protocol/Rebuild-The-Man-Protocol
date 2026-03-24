'use client';

import { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  isDangerous = false
}: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-tactical-darkgray border-2 max-w-lg w-full p-8 shadow-2xl ${isDangerous ? 'border-red-700' : 'border-tactical-orange'}`}>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">
            {title}
          </h2>
          <div className={`h-1 w-20 ${isDangerous ? 'bg-red-700' : 'bg-tactical-orange'}`} />
        </div>

        {/* Message */}
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className={isDangerous 
              ? "bg-red-900 hover:bg-red-800 text-white font-bold py-3 px-6 transition-all duration-200 uppercase tracking-widest text-sm flex-1"
              : "btn-primary flex-1"
            }
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}



