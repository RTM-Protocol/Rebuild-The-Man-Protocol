'use client';

import { useState } from 'react';
import BrandShieldIcon from '@/components/BrandShieldIcon';
import { BRAND_ORANGE_HEX } from '@/lib/protocolVisualTheme';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "This Isn't Therapy",
      subtitle: "This Is Your Repair Manual",
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-300 leading-relaxed">
            Your mind is a machine. When it breaks down, you need a protocol—not a conversation.
          </p>
          <div className="bg-tactical-steel border-l-4 border-tactical-orange p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🔧</div>
                <div className="text-tactical-orange font-bold uppercase text-sm mb-2">No Theory</div>
                <div className="text-gray-400 text-sm">Just actionable steps</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚙️</div>
                <div className="text-tactical-orange font-bold uppercase text-sm mb-2">No Feelings Talk</div>
                <div className="text-gray-400 text-sm">Just practical work</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✓</div>
                <div className="text-tactical-orange font-bold uppercase text-sm mb-2">Results Only</div>
                <div className="text-gray-400 text-sm">Measured progress</div>
              </div>
            </div>
          </div>
          <p className="text-gray-400 text-center italic">
            Think workshop manual, not self-help book.
          </p>
        </div>
      )
    },
    {
      title: "How This Works",
      subtitle: "3 Steps to Rebuild",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="bg-tactical-steel border-l-4 border-tactical-green p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-tactical-orange bg-tactical-orange/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase mb-2">
                    Pick What&apos;s Broken
                  </h3>
                  <p className="text-gray-300">
                    Choose the system that needs repair. Stress overload? Lost motivation? 
                    Anger management? Select your protocol.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-tactical-steel border-l-4 border-tactical-green p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-tactical-orange bg-tactical-orange/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase mb-2">
                    Follow the Daily Protocol
                  </h3>
                  <p className="text-gray-300">
                    Each day has one mission. 10-30 minutes. Specific instructions. 
                    Execute them. No improvisation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-tactical-steel border-l-4 border-tactical-green p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-tactical-orange bg-tactical-orange/10 w-12 h-12 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase mb-2">
                    Track Your Rebuild
                  </h3>
                  <p className="text-gray-300">
                    Mark missions complete. Watch your streak grow. See measurable progress. 
                    Setbacks happen—log them and continue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "This Requires Work",
      subtitle: "Are You Ready?",
      content: (
        <div className="space-y-6">
          <p className="text-xl text-gray-300 leading-relaxed text-center">
            This isn&apos;t passive. You don&apos;t just read—you do. Daily. No skipping. 
            No shortcuts. The protocol only works if you work it.
          </p>
          
          <div className="bg-tactical-steel border-2 border-tactical-orange p-8">
            <h3 className="text-tactical-orange font-bold uppercase text-sm mb-4 text-center">
              ⚠️ What&apos;s Required
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-tactical-orange font-bold flex-shrink-0">→</span>
                <span><strong className="text-white">Daily commitment:</strong> 10-30 minutes, every day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-tactical-orange font-bold flex-shrink-0">→</span>
                <span><strong className="text-white">Honest execution:</strong> Do the work, don&apos;t just read it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-tactical-orange font-bold flex-shrink-0">→</span>
                <span><strong className="text-white">No excuses:</strong> Miss a day? Mark the setback and continue</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-tactical-orange font-bold flex-shrink-0">→</span>
                <span><strong className="text-white">Patience:</strong> Results compound over 14 days, not overnight</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-tactical-green-bright font-bold text-lg italic">
              &ldquo;The rebuild doesn&apos;t happen to you. You build it.&rdquo;
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tactical-gray">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Modal */}
      <div className="relative bg-tactical-darkgray border-3 border-tactical-orange max-w-3xl w-full shadow-tactical-lg corner-cut">
        {/* Header */}
        <div className="bg-gradient-to-r from-tactical-carbon to-tactical-steel p-8 border-b-2 border-tactical-orange">
          <div className="flex items-center justify-between mb-4">
            <div className="text-6xl text-[#faf9f5]">
              <BrandShieldIcon strokeColor={BRAND_ORANGE_HEX} />
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-500 hover:text-tactical-orange transition-colors text-sm font-bold uppercase tracking-wide"
            >
              SKIP →
            </button>
          </div>
          <h2 className="text-4xl font-bold text-white uppercase tracking-tight mb-2">
            {currentSlideData.title}
          </h2>
          <p className="text-tactical-green-bright text-lg font-mono">
            {currentSlideData.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[300px]">
          {currentSlideData.content}
        </div>

        {/* Footer */}
        <div className="p-8 border-t-2 border-tactical-lightgray bg-tactical-steel">
          <div className="flex items-center justify-between">
            {/* Progress Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 transition-all ${
                    index === currentSlide 
                      ? 'w-12 bg-tactical-orange' 
                      : index < currentSlide
                      ? 'w-8 bg-tactical-green'
                      : 'w-8 bg-tactical-lightgray'
                  }`}
                  style={{
                    clipPath: 'polygon(2px 0, 100% 0, 100% calc(100% - 2px), calc(100% - 2px) 100%, 0 100%, 0 2px)'
                  }}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {currentSlide > 0 && (
                <button
                  onClick={() => setCurrentSlide(currentSlide - 1)}
                  className="btn-secondary py-2 px-6"
                >
                  ← BACK
                </button>
              )}
              <button
                onClick={handleNext}
                className="btn-primary py-3 px-8 text-base"
              >
                {currentSlide < slides.length - 1 ? 'NEXT →' : 'START REBUILDING'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

