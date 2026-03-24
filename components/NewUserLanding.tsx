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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tactical-gray">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Content */}
      <div className="relative max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6">🔨</div>
          <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-4">
            What Needs Fixing?
          </h1>
          <p className="text-xl text-gray-300">
            Choose how you want to start your rebuild
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Option 1: Quick Diagnostic */}
          <button
            onClick={onStartDiagnostic}
            className="w-full bg-tactical-darkgray border-2 border-tactical-orange hover:border-tactical-orange-bright p-8 text-left transition-all hover:scale-105 group"
          >
            <div className="flex items-start gap-6">
              <div className="text-5xl group-hover:scale-110 transition-transform">
                🎯
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white uppercase mb-2 group-hover:text-tactical-orange transition-colors">
                  Quick Diagnostic
                </h2>
                <p className="text-gray-300 mb-3">
                  Answer 5 questions (60 seconds) and we&apos;ll recommend the right protocol for you
                </p>
                <div className="text-tactical-orange font-bold uppercase text-sm">
                  Recommended for first-timers →
                </div>
              </div>
            </div>
          </button>

          {/* Option 2: I Know What I Need */}
          <button
            onClick={onBrowseProtocols}
            className="w-full bg-tactical-darkgray border-2 border-tactical-green hover:border-tactical-green-bright p-8 text-left transition-all hover:scale-105 group"
          >
            <div className="flex items-start gap-6">
              <div className="text-5xl group-hover:scale-110 transition-transform">
                📋
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white uppercase mb-2 group-hover:text-tactical-green-bright transition-colors">
                  I Know What I Need
                </h2>
                <p className="text-gray-300 mb-3">
                  Browse all protocols and choose exactly what you want to work on
                </p>
                <div className="text-tactical-green-bright font-bold uppercase text-sm">
                  Skip to protocol library →
                </div>
              </div>
            </div>
          </button>

          {/* Option 3: Not Sure? Start Here */}
          <button
            onClick={onStartFoundation}
            className="w-full bg-tactical-darkgray border-2 border-tactical-lightgray hover:border-white p-8 text-left transition-all hover:scale-105 group"
          >
            <div className="flex items-start gap-6">
              <div className="text-5xl group-hover:scale-110 transition-transform">
                🔨
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white uppercase mb-2 group-hover:text-white transition-colors">
                  Not Sure? Start Here
                </h2>
                <p className="text-gray-300 mb-3">
                  Begin with the Foundation Protocol—complete mental reconstruction
                </p>
                <div className="text-gray-400 font-bold uppercase text-sm">
                  Best for rebuilding from the ground up →
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>All options are free. Choose what feels right.</p>
        </div>
      </div>
    </div>
  );
}

