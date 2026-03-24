'use client';

import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';

interface MissionFieldNotesProps {
  existingNotes?: string;
  onSave: (notes: string) => void;
  onSkip: () => void;
}

const placeholders = [
  "• Used the technique twice - felt weird first time\n• Worked better the second time at work\n• Need to remember this when kids are loud",
  "• Mission was harder than expected\n• Applied it during lunch - helped with stress\n• Still need practice but making progress",
  "• Skipped morning, did it at night instead\n• Noticed I was calmer after\n• Going to try earlier tomorrow",
  "• Easy mission today, took 10 mins\n• Realized I've been doing this wrong before\n• Ready for next level",
  "• Almost forgot, set reminder for tomorrow\n• Used it when argument started - worked\n• This is becoming automatic"
];

// Pre-populated quick select options (top 10 most common debrief notes)
const quickSelectOptions = [
  "Mission completed successfully",
  "Used technique multiple times today",
  "Felt challenging but pushed through",
  "Noticed improvement from yesterday",
  "Applied it during stressful situation",
  "Need more practice with this",
  "Easier than expected",
  "Had to adapt technique to my situation",
  "Felt resistance but did it anyway",
  "Ready for next level"
];

export default function MissionFieldNotes({ existingNotes = '', onSave, onSkip }: MissionFieldNotesProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(existingNotes);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  const maxChars = 300;
  const charCount = notes.length;
  const isNearLimit = charCount >= 280;
  const isAtLimit = charCount >= maxChars;

  // Random placeholder
  const placeholder = placeholders[Math.floor(Math.random() * placeholders.length)];

  const handleQuickSelect = (option: string) => {
    // Check if option is already selected
    const isSelected = selectedOptions.includes(option);
    
    if (isSelected) {
      // Remove from notes
      setSelectedOptions(selectedOptions.filter(o => o !== option));
      const bulletPoint = `• ${option}\n`;
      setNotes(notes.replace(bulletPoint, ''));
    } else {
      // Add to notes with bullet point
      const bulletPoint = `• ${option}\n`;
      const newNotes = notes + bulletPoint;
      
      // Only add if within character limit
      if (newNotes.length <= maxChars) {
        setSelectedOptions([...selectedOptions, option]);
        setNotes(newNotes);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = notes;
      
      // Insert newline and bullet
      const newValue = currentValue.substring(0, start) + '\n• ' + currentValue.substring(end);
      setNotes(newValue);
      
      // Set cursor position after the bullet
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 3;
      }, 0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setNotes(value);
    }
  };

  const handleSave = () => {
    const trimmedNotes = notes.trim();
    if (trimmedNotes) {
      onSave(trimmedNotes);
    } else {
      onSkip(); // Treat empty as skip
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    // Auto-focus text area when expanded
    setTimeout(() => {
      textAreaRef.current?.focus();
    }, 100);
  };

  return (
    <div className="bg-tactical-darkgray border border-tactical-lightgray mt-6">
      {/* Header / Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-tactical-gray transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div className="text-left">
            <h3 className="text-white font-bold uppercase text-sm">
              Mission Field Notes
            </h3>
            <p className="text-gray-400 text-xs">
              Optional - Add quick debrief
            </p>
          </div>
        </div>
        <span className="text-tactical-orange text-xl">
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 border-t border-tactical-lightgray">
          {/* Quick Select Options */}
          <div className="mb-4">
            <label className="text-tactical-green-bright font-bold uppercase text-xs mb-2 block flex items-center gap-2">
              <span>⚡</span>
              <span>Quick Select (Click to add):</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickSelectOptions.map((option, index) => {
                const isSelected = selectedOptions.includes(option);
                const bulletPoint = `• ${option}\n`;
                const wouldExceedLimit = !isSelected && (notes.length + bulletPoint.length > maxChars);
                
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickSelect(option)}
                    disabled={wouldExceedLimit}
                    className={`
                      text-xs font-medium px-3 py-2 border-2 transition-all uppercase tracking-wide
                      ${isSelected
                        ? 'border-tactical-green bg-tactical-green/20 text-tactical-green-bright'
                        : wouldExceedLimit
                        ? 'border-tactical-lightgray bg-tactical-steel text-gray-500 cursor-not-allowed opacity-50'
                        : 'border-tactical-lightgray bg-tactical-gray text-gray-300 hover:border-tactical-orange hover:text-white'
                      }
                    `}
                    title={wouldExceedLimit ? 'Would exceed character limit' : undefined}
                  >
                    {isSelected && <span className="mr-1">✓</span>}
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-500 text-xs flex items-center gap-2">
                <span>💡</span>
                <span>Select common responses or write your own below</span>
              </div>
              {selectedOptions.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedOptions([]);
                    // Remove all quick select bullet points from notes
                    let updatedNotes = notes;
                    quickSelectOptions.forEach(option => {
                      const bulletPoint = `• ${option}\n`;
                      updatedNotes = updatedNotes.replace(bulletPoint, '');
                    });
                    setNotes(updatedNotes);
                  }}
                  className="text-tactical-orange hover:text-orange-400 text-xs uppercase font-bold transition-colors"
                >
                  Clear Selections
                </button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-tactical-lightgray my-4"></div>

          {/* Custom Notes Textarea */}
          <div className="mb-4">
            <label className="text-white font-bold uppercase text-xs mb-2 block">
              Add Your Own Notes:
            </label>
            <textarea
              ref={textAreaRef}
              value={notes}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full bg-tactical-gray border-2 border-tactical-lightgray text-white p-4 font-mono text-sm focus:border-tactical-orange focus:outline-none resize-none"
              rows={5}
              maxLength={maxChars}
            />
          </div>

          {/* Character Counter */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500 text-xs">
              {selectedOptions.length > 0 
                ? `${selectedOptions.length} quick ${selectedOptions.length === 1 ? 'select' : 'selects'} added • Max 300 characters`
                : 'Bullet points preferred • Max 300 characters'
              }
            </p>
            <div className={`font-mono text-xs font-bold ${
              isAtLimit ? 'text-red-500' : isNearLimit ? 'text-tactical-orange' : 'text-gray-500'
            }`}>
              {charCount}/300
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="btn-primary flex-1"
              disabled={charCount === 0}
            >
              {charCount === 0 ? 'Add Notes to Save' : 'Save Notes'}
            </button>
            <button
              onClick={onSkip}
              className="btn-secondary flex-1"
            >
              Skip
            </button>
          </div>

          <p className="text-gray-500 text-xs mt-3 text-center">
            Notes stored privately on your device. Your record, your business.
          </p>
        </div>
      )}
    </div>
  );
}






