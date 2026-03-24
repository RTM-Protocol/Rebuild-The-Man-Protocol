'use client';

import { useState } from 'react';
import { UserProgress } from '@/types';
import { 
  exportToCSV, 
  exportToTXT, 
  exportToJSON,
  generateHTMLForExport,
  ExportFormat 
} from '@/utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
}

export default function ExportModal({ isOpen, onClose, progress }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('txt');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);

    try {
      switch (selectedFormat) {
        case 'csv':
          exportToCSV(progress);
          break;
        case 'txt':
          exportToTXT(progress);
          break;
        case 'json':
          exportToJSON(progress);
          break;
        case 'pdf':
          await exportToPDF(progress);
          break;
        case 'png':
        case 'jpeg':
          await exportToImage(progress, selectedFormat);
          break;
      }

      // Show success message
      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);
      alert('Export failed. Please try again.');
    }
  };

  const exportToPDF = async (progress: UserProgress) => {
    try {
      // Dynamic import to avoid SSR issues
      const html2pdf = (await import('html2pdf.js' as any)).default;
      const html = generateHTMLForExport(progress);
      
      const element = document.createElement('div');
      element.innerHTML = html;
      element.style.width = '800px';
      
      const opt = {
        margin: 10,
        filename: `Protocol_Export_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#1a1a1a' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF export error:', error);
      throw new Error('PDF export requires html2pdf.js package. Run: npm install');
    }
  };

  const exportToImage = async (progress: UserProgress, format: 'png' | 'jpeg') => {
    try {
      const html2canvas = (await import('html2canvas' as any)).default;
      const html = generateHTMLForExport(progress);
      
      const element = document.createElement('div');
      element.innerHTML = html;
      element.style.width = '800px';
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      document.body.appendChild(element);

      const canvas = await html2canvas(element, {
        backgroundColor: '#1a1a1a',
        scale: 2
      });

      document.body.removeChild(element);

      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Protocol_Export_${new Date().toISOString().split('T')[0]}.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, format === 'jpeg' ? 'image/jpeg' : 'image/png');
    } catch (error) {
      console.error('Image export error:', error);
      throw new Error('Image export requires html2canvas package. Run: npm install');
    }
  };

  const formatOptions: { value: ExportFormat; label: string; description: string; icon: string }[] = [
    {
      value: 'txt',
      label: 'Text File (.txt)',
      description: 'Plain text format - readable in any text editor',
      icon: '📄'
    },
    {
      value: 'csv',
      label: 'Spreadsheet (.csv)',
      description: 'Open in Excel, Google Sheets, or Numbers',
      icon: '📊'
    },
    {
      value: 'json',
      label: 'JSON Data (.json)',
      description: 'Structured data format for developers',
      icon: '{ }'
    },
    {
      value: 'pdf',
      label: 'PDF Document (.pdf)',
      description: 'Professional document format - requires download',
      icon: '📑'
    },
    {
      value: 'png',
      label: 'PNG Image (.png)',
      description: 'High-quality image - share anywhere',
      icon: '🖼️'
    },
    {
      value: 'jpeg',
      label: 'JPEG Image (.jpg)',
      description: 'Compressed image - smaller file size',
      icon: '📸'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-tactical-darkgray border-2 border-tactical-green max-w-3xl w-full relative animate-slide-up">
        {/* Header */}
        <div className="bg-tactical-green px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold uppercase text-xl flex items-center gap-3">
              <span>📤</span>
              <span>Export Mission Data</span>
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-black transition-colors text-2xl leading-none"
              disabled={isExporting}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-300 leading-relaxed mb-2">
              Export your mission data, field notes, and progress summary in your preferred format.
            </p>
            <p className="text-gray-400 text-sm">
              Select a format below to download your complete protocol history.
            </p>
          </div>

          {/* Format Selection */}
          <div className="space-y-3 mb-6">
            {formatOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedFormat(option.value)}
                className={`
                  w-full text-left p-4 border-2 transition-all
                  ${selectedFormat === option.value
                    ? 'border-tactical-green bg-tactical-green/10'
                    : 'border-tactical-lightgray hover:border-tactical-green/50'
                  }
                `}
                disabled={isExporting}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{option.icon}</div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm uppercase mb-1 ${
                      selectedFormat === option.value ? 'text-tactical-green-bright' : 'text-white'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {option.description}
                    </div>
                  </div>
                  {selectedFormat === option.value && (
                    <div className="text-tactical-green-bright text-xl">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Export Info */}
          <div className="bg-tactical-gray border-l-4 border-tactical-orange p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-tactical-orange text-xl">ℹ️</span>
              <div>
                <h3 className="text-white font-bold uppercase text-xs mb-2">
                  What&apos;s Included:
                </h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Mission completion status for all days</li>
                  <li>• Field notes and tactical debriefs</li>
                  <li>• Pre/post-mission ratings</li>
                  <li>• Streak data and progress summary</li>
                  <li>• Setback records (if any)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className={`
                flex-1 btn-primary py-4 font-bold uppercase tracking-wider
                ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isExporting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  <span>Exporting...</span>
                </span>
              ) : (
                <span>📥 Export Now</span>
              )}
            </button>
            <button
              onClick={onClose}
              disabled={isExporting}
              className="btn-secondary py-4 font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
          </div>

          {/* Download Note */}
          {(selectedFormat === 'pdf' || selectedFormat === 'png' || selectedFormat === 'jpeg') && (
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-xs uppercase">
                <span className="font-bold">Note:</span> {selectedFormat.toUpperCase()} export requires loading additional libraries
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

