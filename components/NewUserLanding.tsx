'use client';

interface NewUserLandingProps {
  onStartDiagnostic: () => void;
  onBrowseProtocols: () => void;
  onStartFoundation: () => void;
}

export default function NewUserLanding({ 
  onStartDiagnostic, 
  onBrowseProtocols, 
  onStartFoundation 
}: NewUserLandingProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tactical-gray">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative min-h-full flex items-center justify-center px-4 py-12 sm:py-16">
        {/* Content */}
        <div className="relative max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mb-5">
              <div className="font-brand text-4xl font-bold text-white uppercase tracking-tight leading-tight">
                Rebuild the man
              </div>
              <div className="font-brand text-6xl font-extrabold text-white tracking-tight leading-none">
                Protocol
              </div>
            </div>
            <div className="text-4xl mb-3">🔨</div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-3">
              What Needs Fixing?
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Choose how you want to start your rebuild
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {/* Option 1: Quick Diagnostic */}
            <button
              onClick={onStartDiagnostic}
              className="w-full bg-tactical-darkgray border-2 border-tactical-orange hover:border-tactical-orange-bright p-6 text-left transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white uppercase mb-1.5 group-hover:text-tactical-orange transition-colors">
                    Quick Diagnostic
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Answer 5 questions (60 seconds) and we&apos;ll recommend the right protocol for you
                  </p>
                  <div className="text-tactical-orange font-bold uppercase text-xs tracking-wide">
                    Recommended for first-timers →
                  </div>
                </div>
              </div>
            </button>

            {/* Option 2: I Know What I Need */}
            <button
              onClick={onBrowseProtocols}
              className="w-full bg-tactical-darkgray border-2 border-tactical-green hover:border-tactical-green-bright p-6 text-left transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  📋
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white uppercase mb-1.5 group-hover:text-tactical-green-bright transition-colors">
                    I Know What I Need
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Browse all protocols and choose exactly what you want to work on
                  </p>
                  <div className="text-tactical-green-bright font-bold uppercase text-xs tracking-wide">
                    Skip to protocol library →
                  </div>
                </div>
              </div>
            </button>

            {/* Option 3: Not Sure? Start Here */}
            <button
              onClick={onStartFoundation}
              className="w-full bg-tactical-darkgray border-2 border-tactical-lightgray hover:border-white p-6 text-left transition-all hover:scale-[1.02] group"
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl group-hover:scale-110 transition-transform">
                  🔨
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white uppercase mb-1.5 group-hover:text-white transition-colors">
                    Not Sure? Start Here
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    Begin with the Foundation Protocol — complete mental reconstruction
                  </p>
                  <div className="text-gray-400 font-bold uppercase text-xs tracking-wide">
                    Best for rebuilding from the ground up →
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center text-white text-sm">
            <p>All options are free. Choose what feels right.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

