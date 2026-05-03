'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { emergencyProtocols } from '@/data/emergencyProtocols';
import ProtocolIconShell from '@/components/ProtocolIconShell';
import { EMERGENCY_ICON_GLOW } from '@/lib/protocolVisualTheme';

export default function EmergencyProtocolDetail() {
  const params = useParams();
  const protocolId = params.id as string;
  const protocol = emergencyProtocols.find(p => p.id === protocolId);
  const [showWhy, setShowWhy] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  if (!protocol) {
    return (
      <div className="min-h-screen bg-tactical-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">PROTOCOL NOT FOUND</h1>
          <Link href="/emergency-tools" className="btn-primary inline-block">
            Back to Emergency Tools
          </Link>
        </div>
      </div>
    );
  }

  const totalSteps = protocol.steps.length;

  return (
    <div className="min-h-screen bg-tactical-black">
      <Navigation />

      {/* Header */}
      <header className="bg-tactical-darkgray border-b-2 border-red-600">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-4">
            <Link
              href="/emergency-tools"
              className="text-red-500 hover:text-red-400 text-sm font-bold uppercase transition-colors"
            >
              ← Back to Emergency Tools
            </Link>
          </div>
          
          <div className="flex items-start gap-4 mb-4">
            <span className="text-6xl breathe-animation leading-none inline-flex">
              <ProtocolIconShell
                glow12={EMERGENCY_ICON_GLOW.glow12}
                glow20={EMERGENCY_ICON_GLOW.glow20}
              >
                <span className="block leading-none">{protocol.icon}</span>
              </ProtocolIconShell>
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight mb-2">
                {protocol.name}
              </h1>
              <div className="text-red-500 font-mono text-sm">
                ⏱ {protocol.estimatedTime} TOTAL
              </div>
            </div>
          </div>

          <div className="bg-tactical-gray border-l-4 border-red-600 p-4">
            <div className="text-white font-bold uppercase text-xs mb-2">Use When:</div>
            <p className="text-gray-200 italic">
              {protocol.useWhen}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Step Navigator */}
        <div className="mb-8 bg-tactical-darkgray border border-tactical-lightgray p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-white font-bold uppercase text-sm">
              Protocol Steps
            </div>
            <div className="text-tactical-orange font-mono text-xs">
              Step {currentStep + 1} of {totalSteps}
            </div>
          </div>
          <div className="flex gap-2">
            {protocol.steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`
                  flex-1 h-2 transition-all
                  ${index === currentStep 
                    ? 'bg-red-600' 
                    : index < currentStep 
                    ? 'bg-tactical-green' 
                    : 'bg-tactical-gray'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Current Step Display */}
        <div className="mb-8">
          {protocol.steps.map((step, index) => (
            <div
              key={index}
              className={`
                transition-all duration-300
                ${index === currentStep ? 'block' : 'hidden'}
              `}
            >
              <div className="bg-tactical-darkgray border-l-4 border-red-600 p-8 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl font-bold text-red-600 bg-red-600/10 w-20 h-20 flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white uppercase">
                      {step.title}
                    </h2>
                    <div className="text-tactical-orange font-mono text-sm mt-1">
                      {step.duration}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {step.instructions.map((instruction, i) => {
                    // Check if it's a blank line for spacing
                    if (instruction === '') {
                      return <div key={i} className="h-2" />;
                    }
                    
                    // Check if it's a bullet point
                    if (instruction.startsWith('•')) {
                      return (
                        <div key={i} className="flex items-start gap-3 pl-4">
                          <span className="text-red-500 flex-shrink-0">•</span>
                          <p className="text-gray-200 text-lg leading-relaxed">
                            {instruction.substring(1).trim()}
                          </p>
                        </div>
                      );
                    }
                    
                    // Regular instruction
                    return (
                      <p key={i} className="text-gray-200 text-lg leading-relaxed">
                        {instruction}
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {index > 0 && (
                  <button
                    onClick={() => setCurrentStep(index - 1)}
                    className="btn-secondary flex-1"
                  >
                    ← Previous Step
                  </button>
                )}
                
                {index < totalSteps - 1 ? (
                  <button
                    onClick={() => setCurrentStep(index + 1)}
                    className="btn-primary flex-1"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="bg-tactical-green hover:bg-tactical-green-bright text-white font-bold py-3 px-6 transition-all uppercase tracking-widest text-sm flex-1"
                  >
                    ↻ Start Over
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Step Access */}
        <div className="mb-8 bg-tactical-gray p-6">
          <h3 className="text-white font-bold uppercase text-sm mb-4">
            Quick Step Access
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {protocol.steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`
                  p-3 border-2 transition-all text-sm
                  ${index === currentStep
                    ? 'border-red-600 bg-red-600/20 text-white'
                    : 'border-tactical-lightgray hover:border-tactical-orange text-gray-400 hover:text-white'
                  }
                `}
              >
                <div className="font-mono text-xs mb-1">STEP {index + 1}</div>
                <div className="font-bold uppercase text-xs">{step.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Why It Works */}
        <div className="mb-8 bg-tactical-darkgray border border-tactical-lightgray">
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="w-full p-6 flex items-center justify-between hover:bg-tactical-gray transition-colors"
          >
            <h3 className="text-white font-bold uppercase text-lg flex items-center gap-2">
              <span>🔬</span>
              <span>Why This Works</span>
            </h3>
            <span className="text-tactical-orange text-2xl">
              {showWhy ? '−' : '+'}
            </span>
          </button>
          
          {showWhy && (
            <div className="px-6 pb-6 border-t border-tactical-lightgray pt-4">
              <p className="text-gray-300 leading-relaxed">
                {protocol.whyItWorks}
              </p>
            </div>
          )}
        </div>

        {/* Important Note */}
        {protocol.note && (
          <div className="mb-8 bg-tactical-orange/10 border-l-4 border-tactical-orange p-6">
            <h3 className="text-tactical-orange font-bold uppercase text-sm mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Important Note</span>
            </h3>
            <p className="text-gray-200 leading-relaxed">
              {protocol.note}
            </p>
          </div>
        )}

        {/* Avoid (if present) */}
        {protocol.avoid && (
          <div className="mb-8 bg-red-900/10 border-l-4 border-red-600 p-6">
            <h3 className="text-red-500 font-bold uppercase text-sm mb-2 flex items-center gap-2">
              <span>⛔</span>
              <span>Avoid</span>
            </h3>
            <p className="text-gray-200 leading-relaxed">
              {protocol.avoid}
            </p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/emergency-tools"
            className="btn-secondary flex-1 text-center"
          >
            ← All Emergency Tools
          </Link>
          <Link
            href="/"
            className="btn-primary flex-1 text-center"
          >
            Browse Full Protocols
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}







